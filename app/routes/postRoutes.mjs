import express from 'express';
import {post} from '../controllers/postController.mjs';
import {authMiddleware} from '../middleware/authMiddleware.mjs';

export const router = express.Router();

router.post('/dopost', authMiddleware, post);

