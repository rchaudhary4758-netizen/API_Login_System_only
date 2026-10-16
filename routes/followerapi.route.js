import { Router } from "express";
import { toggleFollowUser } from "../controllers/followerapi.controller.js";
import { verifyJwt } from "../middlewares/Auth.middleware.js";

const router = Router();

router.use(verifyJwt);

router.route("/toggle/user/:userId").post(verifyJwt,toggleFollowUser);

export default router;