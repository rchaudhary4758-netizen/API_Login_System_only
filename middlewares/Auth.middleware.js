import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const verifyJWT = asyncHandler(async (req, res, next) => {
  const authorizationHeader = req.headers?.authorization || req.header('Authorization');

  const token =
    req.cookies?.accessToken ||
    (authorizationHeader?.startsWith('Bearer ')
      ? authorizationHeader.split(' ')[1]?.trim()
      : null);

  if (!token) {
    throw new ApiError(401, 'Unauthorized request: Access token is missing');
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, 'Unauthorized request: Invalid or expired access token');
  }

  const userId = decodedToken?.userId || decodedToken?._id;
  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new ApiError(401, 'Unauthorized request: User not found or invalid token');
  }

  req.user = user;
  next();
});

const verifyAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized request: Authentication required');
  }

  if (req.user?.role !== 'admin') {
    throw new ApiError(403, 'Forbidden: Admin access required');
  }

  next();
});

export { verifyJWT, verifyAdmin };
export default { verifyJWT, verifyAdmin };