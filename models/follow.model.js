import mongoose, { Schema } from 'mongoose';

const followSchema = new Schema(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Follower ID is required'],
      index: true,
    },
    followingId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Following ID is required'],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

export const Follow = mongoose.model('Follow', followSchema);
export default Follow;