import express from 'express';
import { configDotenv } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { getUser, getUsers } from './db/db';

configDotenv();
const port = process.env.SERVER_PORT || 9999;

const app = express();

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users)
})

app.get('/user/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUser(id)
  res.json(user)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});