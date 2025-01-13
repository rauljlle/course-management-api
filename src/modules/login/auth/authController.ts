import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../user/UserModel';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
