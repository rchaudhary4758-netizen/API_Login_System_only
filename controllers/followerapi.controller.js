import mongoose from "mongoose";
import { Follow } from "../models/follow.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const FollowUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const followerId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user ID format");
    }

    if (userId.toString() === followerId.toString()) {
        throw new ApiError(400, "You cannot follow yourself");
    }

    const existingFollow = await Follow.findOne({
        follower: followerId,
        following: userId
    });

    if (existingFollow) {
        await Follow.findByIdAndDelete(existingFollow._id);
        
        return res.status(200).json(
            new ApiResponse(
                200, 
                { isFollowing: false }, 
                "User unfollowed successfully"
            )
        );
    }

    await Follow.create({
        follower: followerId,
        following: userId
    });

    return res.status(200).json(
        new ApiResponse(
            200, 
            { isFollowing: true }, 
            "User followed successfully"
        )
    );
});
