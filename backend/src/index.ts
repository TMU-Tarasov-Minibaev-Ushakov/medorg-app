import httpServer from "express";
import { authRouter } from "./routes/auth/auth.router";
import { env } from "./env";
import cors from "cors";
import { authMiddleware } from "./middlewares/auth.middleware";
import { mlRouter } from "./routes/ml/ml.router";
import {usersRouter} from "./routes/users/users.router";
import {appointmentsRouter} from "./routes/appointments/appointments.router";
import {createServer} from "node:http";
import {Server} from "socket.io";
import {messagesRouter} from "./routes/messages/messages.router";

//test

const app = httpServer();
const server =  createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://176.123.169.171:3000'
    ]
  }
});

io.on('connection', socket => {
  socket.on('clientMessage', data => {
    io.emit('serverMessage', data)
  })
})

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://176.123.169.171:3000'
    ],
  })
);
// parse requests of content-type - application/json
app.use(httpServer.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  httpServer.urlencoded({
    extended: true,
  })
);

// set user object to request
app.use(authMiddleware);

app.use(authRouter);
app.use(mlRouter);
app.use(messagesRouter);

app.use('/users', usersRouter);
app.use('/appointments', appointmentsRouter);

app.get("/ping", (req, res) => {
  res.send("pong!");
});


server.listen(env.SERVER_PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${env.SERVER_PORT}`
  );
});
