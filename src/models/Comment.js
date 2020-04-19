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

export const createComment = async (root, { author, post, content }) => {
  const comment = new Comment({ author, post, content });
  await comment.save();
  return comment;
}

export const comments = async () => await Comment.find();

export const getPostComments = async post => await Comment.find({ post: post.id });

export default Comment;
