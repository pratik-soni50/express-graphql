import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  content: String,
}, {
  timestamps: true,
});

const Comment = model('Comment', CommentSchema);

export const createComment = async (root, { post, content }, context) => {
  const { currentUser } = context
  if (!currentUser || !currentUser.id) {
    throw new AuthenticationError('Unable to find user, Please login again');
  }
  try {
    const comment = new Comment({
      author: context.currentUser.id,
      post,
      content,
    });
    await comment.save();
    return comment;
  } catch (e) {
    throw new ApolloError("Internal Server Error");
  }
}

export const comments = async (root, { page, perPage }) => ({
  list: await Comment.find().limit(perPage).skip((page - 1) * perPage),
  count: Comment.countDocuments(),
});

export const getPostComments = async post => await Comment.find({ post: post.id });

export default Comment;
