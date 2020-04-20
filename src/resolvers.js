import scalars from './utils/scalars';
import User, { signUp, login, users, getPostAuthor } from './models/User';
import Post, { posts, createPost, getPostsByAuthor, getPostByComment, updatePost, deletePost } from './models/Post';
import Comment, { createComment, comments, getPostComments } from './models/Comment';

const resolvers = {
  ...scalars,
  Query: {
    users,
    login,
    posts,
    comments,
  },
  Mutation: {
    signUp,
    createPost,
    updatePost,
    createComment,
    deletePost,
  },
  User: {
    posts: getPostsByAuthor
  },
  Post: {
    author: getPostAuthor,
    comments: getPostComments,
  },
  Comment: {
    author: getPostAuthor,
    post: getPostByComment,
  },
};

export default resolvers;
