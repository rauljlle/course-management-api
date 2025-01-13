import { Router } from 'express';
import { login, register } from './auth/authController';

const router = Router();

router.post('/register', register);
router.post('/', login);

export default router;
