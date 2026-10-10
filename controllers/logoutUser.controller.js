import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const logoutUser = asyncHandler(async (req, res) => {
  const clearCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  return res
    .status(200)
    .clearCookie('accessToken', clearCookieOptions)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

export { logoutUser };
export default logoutUser;