import mongoose, { Schema } from 'mongoose';

const settingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true,
      index: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    notificationEnabled: {
      type: Boolean,
      default: true,
    },
    blockedUsers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Setting = mongoose.model('Setting', settingSchema);
export default Setting;