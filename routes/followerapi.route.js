import { Router } from "express";
import { FollowUser } from "../controllers/followerapi.controller.js";
// import { verifyJwt } from "../middlewares/Auth.middleware.js";

const followrouter = Router();

followrouter.route('/FollowUser').post(FollowUser);


export {followrouter};