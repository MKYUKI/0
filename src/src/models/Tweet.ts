// src/models/Tweet.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITweet extends Document {
  content: string;
  author: string; // User._id (string)
  authorName?: string;
  authorImage?: string;
  likes: string[];
  retweets: string[];
  createdAt: Date;
}

const TweetSchema = new Schema<ITweet>(
  {
    content: { type: String, required: true },
    author: { type: String, required: true },
    authorName: { type: String },
    authorImage: { type: String },
    likes: [{ type: String }], // userId
    retweets: [{ type: String }], // userId
  },
  { timestamps: true }
);

export const Tweet =
  (mongoose.models.Tweet as mongoose.Model<ITweet>) ||
  mongoose.model<ITweet>('Tweet', TweetSchema);
