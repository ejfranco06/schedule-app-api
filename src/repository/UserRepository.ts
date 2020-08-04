import { pool } from '../db/db';
const TABLE = 'app_user';

export const add = async (username: string, password: string) => {
  const SQL: string = `INSERT INTO ${TABLE} (username, password) VALUES($1, $2) RETURNING id, username`;
  //TODO HASH PASSWORD IN THE SERVICE LAYER
  const PARAMS: string[] = [username, password];
  return pool.query(SQL, PARAMS);
};

// DO NOT RETURN TO END USERS CONTAINS PASSWORD FOR AUTH
// ONLY USE IN THE SERVICE LAYER
export const findByUserName = async (username: string) => {
  const SQL: string = `SELECT id, username, password FROM ${TABLE} WHERE username = $1`;
  const PARAMS: string[] = [username];
  return pool.query(SQL, PARAMS);
};

export const userRepository = {
  findByUserName,
  add,
};