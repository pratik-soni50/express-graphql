import { ApolloError, AuthenticationError } from 'apollo-server-express';
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

export const createPost = async (root, { content }, context) => {
  const { currentUser } = context
  if (!currentUser || !currentUser.id) {
    throw new AuthenticationError('Unable to find user, Please login again');
  }
  try {
    const post = new Post({
      author: context.currentUser.id,
      content,
    });
    await post.save();
    return post;
  } catch (e) {
    throw new ApolloError('Internal Server Error');
  }
}

export const updatePost = async (root, { id, content }) => {
  await Post.findByIdAndUpdate(id, { content });
  return postById({}, { id });
}

export const postById = async (root, { id }) => await Post.findById(id);

export const posts = async (root, { page, perPage }) => ({
  list: await Post.find().limit(perPage).skip((page - 1) * perPage).sort({createdAt: -1}),
  count: Post.countDocuments(),
});

export const getPostsByAuthor = async user => await Post.find({ author: user.id });

export const getPostByComment = async comment => await Post.findById(comment.post);

export const deletePost = async (root, { id }, context) => {
  const { currentUser } = context;
  if (currentUser.role === 'ADMIN') {
    return Boolean(await Post.findByIdAndDelete(id));
  } else {
    const post = await Post.findById(id);
    if(!post) {
      throw new ApolloError('Requested post didn\'t found');
    }
    if(post.author.toString() === currentUser.id) {
      return Boolean(await Post.findByIdAndDelete(id));
    } else {
      throw new AuthenticationError('User can delete only own Posts');
    }
  }
}

export default Post;
