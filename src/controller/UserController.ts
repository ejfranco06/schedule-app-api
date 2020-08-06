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

userController.post(
  '/login',
  passport.authenticate('login', { session: false,  failWithError: true  }),
  async (req: Request, res: Response) => {
    // Create token from user
    const token  = " bad fake token" 
    res.status(200).json({
      message: 'User login successful',
      token: token
    });
  }
);
