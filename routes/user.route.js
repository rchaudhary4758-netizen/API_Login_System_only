import { Router } from 'express';
import { registerUser, loginUser, logoutUser,FollowUser } from '../controllers/index.js';
import { verifyJWT } from '../middlewares/Auth.middleware.js';

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);

userRouter.route('/logout').post(verifyJWT, logoutUser);

userRouter.route('/FollowUser').post(FollowUser);
export { userRouter };
export default userRouter;