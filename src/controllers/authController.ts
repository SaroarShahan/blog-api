import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '~/models/userModel';

/**
 * @description Signup a user
 * @route POST /api/v1/auth/signup
 * @access public
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, username } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email, password, and username are required',
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        status: 'fail',
        message: 'This email already associated with an account',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashPassword,
    });

    res.status(201).json({
      status: 'success',
      message: 'Signup successful',
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

/**
 * @description Login a user
 * @route POST /api/v1/auth/login
 * @access public
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email and password are required',
        data: null,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid email or password',
        data: null,
      });
    }

    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid email or password',
        data: null,
      });
    }

    const token = await jwt.sign(
      {
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      process.env.SECRET!,
      {
        expiresIn: '2d',
      },
    );

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
