import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { Setting } from '../models/setting.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!username?.trim() || !email?.trim() || !password) {
    throw new ApiError(400, 'Username, email, and password are required');
  }

  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    $or: [{ username: normalizedUsername }, { email: normalizedEmail }],
  });

  if (existingUser) {
    throw new ApiError(409, 'User with this username or email already exists');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = await User.create({
    firstName: firstName?.trim() || '',
    lastName: lastName?.trim() || '',
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashedPassword,
  });

  await Setting.create({
    userId: createdUser._id,
  });

  const sanitizedUser = await User.findById(createdUser._id).select('-password');

  if (!sanitizedUser) {
    throw new ApiError(500, 'Failed to register user. Please try again later');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, sanitizedUser, 'User registered successfully'));
});

export { registerUser };
export default registerUser;