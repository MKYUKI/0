// components/TweetItem.tsx
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import ReplyForm from "./ReplyForm";

type Tweet = {
  id: string;
  content: string;
  imageUrl?: string;
  user: {
    id: string;
    email?: string;
    name?: string;
    image?: string;
  };
  createdAt: string;
  likes?: { id: string; userId: string }[];
  replies?: {
    id: string;
    content: string;
    userId: string;
    user: { email?: string; name?: string };
    createdAt: string;
  }[];
};

type Props = {
  tweet: Tweet;
  onDelete?: () => void;
};

export default function TweetItem({ tweet, onDelete }: Props) {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const isOwner = session?.user?.email === tweet.user.email;
  const hasLiked = tweet.likes?.some((like) => like.userId === (session?.user as any)?.id);
  const likeCount = tweet.likes?.length || 0;

  // -----------------------
  // Delete (オーナーのみ)
  // -----------------------
  const handleDelete = async () => {
    if (!isOwner) return;
    try {
      setLoading(true);
      await axios.delete(`/api/tweets/${tweet.id}`);
      if (onDelete) onDelete();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // Like / Unlike
  // -----------------------
  const handleLike = async () => {
    try {
      setLoading(true);
      if (hasLiked) {
        await axios.delete("/api/tweets/like", { data: { tweetId: tweet.id } });
      } else {
        await axios.post("/api/tweets/like", { tweetId: tweet.id });
      }
      mutate("/api/tweets");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // Retweet
  // -----------------------
  const handleRetweet = async () => {
    try {
      setLoading(true);
      await axios.post("/api/tweets/retweet", { tweetId: tweet.id });
      // 成功したら再フェッチ
      mutate("/api/tweets");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded">
      <p className="text-sm text-gray-500">
        {tweet.user.name || tweet.user.email} — {new Date(tweet.createdAt).toLocaleString()}
      </p>
      <p className="whitespace-pre-wrap mt-1">{tweet.content}</p>
      {tweet.imageUrl && (
        <img src={tweet.imageUrl} alt="tweet" className="mt-2 max-h-60 object-cover border" />
      )}

      <div className="flex items-center gap-2 mt-2">
        {/* Like */}
        <button
          onClick={handleLike}
          disabled={loading}
          className={`px-2 py-1 rounded text-sm ${
            hasLiked ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          {hasLiked ? "Unlike" : "Like"}
        </button>
        <span className="text-sm text-gray-600 mr-4">{likeCount} likes</span>

        {/* Retweet */}
        <button
          onClick={handleRetweet}
          disabled={loading}
          className="px-2 py-1 rounded text-sm bg-green-400 text-white"
        >
          Retweet
        </button>

        {/* Replies */}
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="px-2 py-1 rounded text-sm bg-gray-100"
        >
          {showReplies ? "Hide" : "View"} Replies ({tweet.replies?.length || 0})
        </button>

        {/* Delete (owner only) */}
        {isOwner && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            Delete
          </button>
        )}
      </div>

      {/* Reply List & Form */}
      {showReplies && (
        <div className="mt-2 ml-4 border-l pl-2">
          {(tweet.replies || []).map((reply) => (
            <div key={reply.id} className="mb-2">
              <p className="text-xs text-gray-500">
                {reply.user?.name || reply.user?.email} -{" "}
                {new Date(reply.createdAt).toLocaleString()}
              </p>
              <p className="text-sm">{reply.content}</p>
            </div>
          ))}
          <ReplyForm tweetId={tweet.id} />
        </div>
      )}
    </div>
  );
}
