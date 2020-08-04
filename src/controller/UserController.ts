import express, { Response, Request, Router } from 'express';
import passport from 'passport';

export const userController: Router = express.Router();

userController.post(
  '/register',
  passport.authenticate('register', { session: false,  failWithError: true  }),
  async (req: Request, res: Response) => {
    res.status(201).json({
      message: 'User registered',
      user: req.user,
    });
  }
);
