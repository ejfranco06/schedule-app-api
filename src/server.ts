import express, { Response, Request, Application, json, urlencoded } from 'express';
import dotenv from 'dotenv';

import * as userRepository from "./repository/UserRepository";

import { pool } from './db/db';

dotenv.config();

const app: Application = express();
const PORT: Number = parseInt(`${process.env.PORT}`, 10) || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => res.send(`I'm a working server`));

// test user repo
app.post('/user/add', async (req: Request, res: Response) => {
  let newUser;
  const {username, password} = req.body;
  try {
   let result = await userRepository.add(username, password);
    newUser = result?.rows[0];
  } catch (err) {
    console.log(err);
    res.status(400).send(err.detail);
  }
  res.status(201).send(newUser);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
