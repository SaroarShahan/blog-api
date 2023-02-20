import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Post', postSchema);
