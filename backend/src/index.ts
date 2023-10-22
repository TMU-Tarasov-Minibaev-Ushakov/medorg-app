import express from 'express';
import { getUsers, getUser } from './db/user';
import { authRouter } from './routes/auth/auth.router';
import { env } from './env';
import { createPermissionsValidator } from './helpers/createPermissionsValidator';
import { PermissionName } from './types';

const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

app.use(authRouter);

app.get('/ping', (req, res) => {
  res.send('pong!');
});

app.get('/users', createPermissionsValidator([PermissionName.viewUsers]), async (req, res) => {
  const users = await getUsers();
  res.json(users)
})

app.get('/user/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUser(id)
  res.json(user)
})

app.listen(env.SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${env.SERVER_PORT}`);
});