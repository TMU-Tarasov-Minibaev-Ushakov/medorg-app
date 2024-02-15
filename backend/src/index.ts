import httpServer from "express";
import { authRouter } from "./routes/auth/auth.router";
import { env } from "./env";
import cors from "cors";
import { authMiddleware } from "./middlewares/auth.middleware";
import { mlRouter } from "./routes/ml/ml.router";
import {usersRouter} from "./routes/users/users.router";

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
server.use('/users', usersRouter);

server.get("/ping", (req, res) => {
  res.send("pong!");
});


server.listen(env.SERVER_PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${env.SERVER_PORT}`
  );
});
