import httpServer from "express";
import { getUsers, getUser } from "./db/user";
import { authRouter } from "./routes/auth/auth.router";
import { env } from "./env";
import { createPermissionsValidator } from "./helpers/createPermissionsValidator";
import { PermissionName } from "./constants";
import cors from "cors";
import { authMiddleware } from "./middlewares/auth.middleware";
import { mlRouter } from "./routes/ml/ml.router";

const server = httpServer();

server.use(
  cors({
    origin: "*",
  })
);
// parse requests of content-type - application/json
server.use(httpServer.json());
// parse requests of content-type - application/x-www-form-urlencoded
server.use(
  httpServer.urlencoded({
    extended: true,
  })
);

// set user object to request
server.use(authMiddleware);

// app.use((req, res, next) => {
//   console.log(req)
//   next()
// })
server.use(authRouter);
server.use(mlRouter);

server.get("/ping", (req, res) => {
  res.send("pong!");
});

server.get(
  "/users",
  createPermissionsValidator([PermissionName.viewUsers]),
  async (req, res) => {
    const users = await getUsers();
    res.json(users);
  }
);

server.get("/user/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUser(id);
  res.json(user);
});

server.listen(env.SERVER_PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${env.SERVER_PORT}`
  );
});
