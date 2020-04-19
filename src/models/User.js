import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: Number,
}, {
  timestamps: true,
});

const User = model("User", UserSchema);

export const signUp = async (root, { name, email, password }) => {
  const newUser = new User({
    name,
    email,
    password: password ? await hash(password, 2) : '',
    role: 0,
  });
  console.log('The password is', password);
  await newUser.save();
  return newUser;
}

export const login = async (root, { email, password }) => {
  const user = await User.findOne({ email });
  if (user && user.password) {
    const data = await compare(password, user.password);
    if (data) {
      return user;
    }
  }
  return null;
}

export const users = async () => await User.find();

export const getPostAuthor = async post => await User.findById(post.author);

export default User;
