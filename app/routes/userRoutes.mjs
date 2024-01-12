import express from 'express';
import {follow,getFeed,getOtherUsers,getUserPosts} from '../controllers/userController.mjs';
import {authMiddleware} from '../middleware/authMiddleware.mjs';

export const router = express.Router();

router.post('/follow/:userId', authMiddleware, follow);
router.get('/feed', authMiddleware, getFeed);
router.get('/myposts', authMiddleware, getUserPosts);
router.get('/other-users', authMiddleware, getOtherUsers);
