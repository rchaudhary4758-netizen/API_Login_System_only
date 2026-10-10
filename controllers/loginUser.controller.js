import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000,
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if ((!email?.trim() && !username?.trim()) || !password) {
    throw new ApiError(400, 'Email or username and password are required');
  }

  const queryConditions = [];

  if (email?.trim()) {
    queryConditions.push({ email: email.trim().toLowerCase() });
  }

  if (username?.trim()) {
    queryConditions.push({ username: username.trim().toLowerCase() });
  }

  const user = await User.findOne({ $or: queryConditions }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const accessToken = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d',
    }
  );

  const loggedInUser = await User.findById(user._id).select('-password');

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        'User logged in successfully'
      )
    );
});

export { loginUser };
export default loginUser;