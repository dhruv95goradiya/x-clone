import express from 'express';
import { connectDB } from "./config/db.mjs";
import { router as authRoutes } from './app/routes/authRoutes.mjs';
import {router as postRoutes} from './app/routes/postRoutes.mjs';
import {router as userRoutes} from './app/routes/userRoutes.mjs';

export const app = express();
app.use(express.json());

// Connect to the database
connectDB();

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});