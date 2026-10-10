
import mongoose, { Schema } from 'mongoose';

const postImageSchema = new Schema(
  {
    url: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    publicId: {
      type: String,
      required: [true, 'Image public ID is required'],
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const postSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      default: '',
    },
    images: {
      type: [postImageSchema],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post owner is required'],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model('Post', postSchema);
export default Post;