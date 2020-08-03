import express, { Response, Request, Application } from 'express';
import dotenv from 'dotenv';

import { pool } from './db/db';

dotenv.config();

const app: Application = express();
const PORT: Number = parseInt(`${process.env.PORT}`, 10) || 3000;

app.get('/', (req: Request, res: Response) => res.send(`I'm a working server`));

// test data base
app.post('/user/add', async (req: Request, res: Response) => {
  const SQL: string =
    'INSERT INTO app_user (username, password) VALUES($1, $2) RETURNING *';
  const params: string[] = ['felipe3', 'pass'];
  let result;

  try {
    result = await pool.query(SQL, params);
  } catch (err) {
    res.status(400).send(err.detail);
  }
  
  res.status(201).send(result?.rows[0]);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
