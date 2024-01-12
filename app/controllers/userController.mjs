import User from '../models/userModel.mjs';

export const follow = async (req, res) => {
  const userIdToFollow = req.params.userId;

  try {
    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) return res.status(404).json({ status:404, message: 'User not found', error:null, data: null });

    await User.findByIdAndUpdate(req.user.userId, { $addToSet: { followers: userIdToFollow } });
    res.json({ status:200, message: 'User followed successfully', error: null, data: null });
  } catch (error) {
    res.status(500).json({ status:500, message: 'Internal Server Error', data: null, error: error });
  }
};

export const getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate({
      path: 'followers',
      populate: {
        path: 'posts',
        model: 'Post',
      },
    }).populate('posts');

    // Combine user's posts and follower posts
    const userPosts = user.posts.map(post => ({ ...post.toObject(), user: req.user.userId }));
    const followerPosts = user.followers.map(follower => follower.posts.map(post => ({ ...post.toObject(), user: follower._id })));

    const feed = userPosts.concat(...followerPosts);
    const uniqueFeed = Array.from(new Set(feed.map(post => post._id.toString())))
      .map(postId => feed.find(post => post._id.toString() === postId));

    const sortedFeed = uniqueFeed.sort((a, b) => b.timestamp - a.timestamp);

    if (sortedFeed.length === 0) {
      return res.json({ status: 200, message: 'No feeds available', data: { feeds: [] }, error: null });
    }

    res.json({ status: 200, message: 'Feeds fetched', data: { feeds: sortedFeed }, error: null });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error', data: null, error: error });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userPosts = await Post.find({ user: req.user.userId }).sort({ timestamp: -1 });

    if (userPosts.length === 0) {
      return res.json({ status: 200, message: 'No posts available for the user', data: { posts: [] }, error: null });
    }

    res.json({ status: 200, message: 'User posts fetched successfully', data: { posts: userPosts }, error: null });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error', data: null, error: error });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const otherUsers = await User.find({ _id: { $ne: req.user.userId } }, 'username');

    if (otherUsers.length === 0) {
      return res.json({ status: 200, message: 'No other users available', data: { users: [] }, error: null });
    }

    res.json({ status: 200, message: 'Other users fetched successfully', data: { users: otherUsers }, error: null });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error', data: null, error: error });
  }
};
