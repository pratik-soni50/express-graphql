import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { generateToken } from '../utils/jwt';

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
}, {
  timestamps: true,
});

const User = model("User", UserSchema);

export const signUp = async (root, { name, email, password }, context) => {
  const newUser = new User({
    name,
    email,
    password: password ? await hash(password, 2) : '',
    role: "ADMIN",
  });
  await newUser.save();
  context.currentUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
  return newUser;
}

export const login = async (root, { email, password }) => {
  const user = await User.findOne({ email });
  if (user && user.password) {
    const data = await compare(password, user.password);
    if (data) {
      return generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }
  return null;
}

export const users = async (root, { page, perPage }) => ({
  list: await User.find().limit(perPage).skip((page - 1) * perPage),
  count: User.countDocuments(),
});

export const getPostAuthor = async post => await User.findById(post.author);

export default User;
