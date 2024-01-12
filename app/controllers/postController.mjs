import Post from '../models/postModel.mjs';
import User from '../models/userModel.mjs';
import {num_of_sentences_limit} from '../../config/db.mjs'


export const post = async (req, res) => {
  const { text } = req.body;

  // Check if "text" is missing or blank
  if (!text || text.trim() === '') {
    return res.status(400).json({ status: 400, message: 'Text is required for the post', data: null, error: null });
  }
  
  // Text validation: Limit to two sentences
  const sentenceCount = text.split(/[.!?]/).filter(Boolean).length;
  if (sentenceCount > num_of_sentences_limit) {
    return res.status(400).json({ status: 400, message: 'Post for Text exceeds the limit of two sentences', data: null, error: null });
  }

  const newPost = await Post.create({ user: req.user.userId, text });

  // Update the user's posts field
  await User.findByIdAndUpdate(req.user.userId, { $addToSet: { posts: newPost._id } });

  // Notify followers
  const user = await User.findById(req.user.userId).populate('followers');

  // Filter out the user's own ID from the follower IDs
  const followerIds = user.followers.map(follower => follower._id.toString()).filter(id => id !== req.user.userId);

  await Promise.all(followerIds.map(async (followerId) => {
    await Post.create({ user: followerId, text });
  }));

  res.status(201).json({ status: 201, message: 'Post created successfully', data: { post: newPost }, error: null });
};





