import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { userRepository } from '../repository/UserRepository';
import dotenv from 'dotenv';
dotenv.config();

const LocalStrategy = passportLocal.Strategy;
const hashRounds = parseInt(`${process.env.HASH_ROUNDS}`, 10) || 10;

// User registrations
passport.use(
  'register',
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const hashPassword = await bcrypt.hash(password, hashRounds);
      let result = await userRepository.add(username, hashPassword);
      let newUser = result?.rows[0];
      return done(null, newUser);
    } catch (error) {
      error.status = error?.status || 401;
      error.message = error?.detail || error?.message || 'Error registering';
      return done(error);
    }
  })
);

passport.use(
  'login',
  new LocalStrategy(async (username, password, done) => {})
);
