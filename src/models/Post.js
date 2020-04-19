import { Schema, model } from 'mongoose';

model.prototype.findByIdAndUpdateSync = function (...rest) {
  console.log('All the data', rest, this);
}

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: String,
}, {
  timestamps: true,
});

const Post = model('Post', PostSchema);

export const createPost = async (root, { author, content }) => {
  const post = new Post({
    author,
    content,
  });
  await post.save();
  return post;
}

export const updatePost = async (root, { id, content }) => {
  await Post.findByIdAndUpdate(id, { content });
  return postById({}, { id });
}

export const postById = async (root, { id }) => await Post.findById(id);

export const posts = async () => await Post.find();

export const getPostsByAuthor = async user => await Post.find({ author: user.id });

export const getPostByComment = async comment => await Post.findById(comment.post);

export default Post;
