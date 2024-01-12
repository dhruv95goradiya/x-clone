import express from 'express';
import { signup, login } from './../controllers/authController.mjs';
export const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
