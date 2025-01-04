// src/components/Tweet.tsx
import React from 'react';
import axios from 'axios';

interface TweetProps {
  tweet: {
    _id: string;
    author: string;
    authorName: string;
    authorImage: string;
    content: string;
    likes: string[];
    retweets: string[];
  };
  currentUserId?: string;
  onUpdate?: () => void;
}

const Tweet: React.FC<TweetProps> = ({ tweet, currentUserId, onUpdate }) => {
  const handleLike = async () => {
    try {
      await axios.put(`/api/tweets/${tweet._id}`, { type: 'like' });
      onUpdate && onUpdate();
    } catch (err) {
      console.error(err);
    }
  };
  const handleUnlike = async () => {
    try {
      await axios.put(`/api/tweets/${tweet._id}`, { type: 'unlike' });
      onUpdate && onUpdate();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tweets/${tweet._id}`);
      onUpdate && onUpdate();
    } catch (err) {
      console.error(err);
    }
  };
  
  const isLiked = tweet.likes.includes(currentUserId || '');

  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
      <div>{tweet.authorName}</div>
      <div>{tweet.content}</div>
      <div>いいね: {tweet.likes.length} / リツイート: {tweet.retweets.length}</div>
      {isLiked ? (
        <button onClick={handleUnlike}>いいね解除</button>
      ) : (
        <button onClick={handleLike}>いいね</button>
      )}
      {tweet.author === currentUserId && (
        <button onClick={handleDelete}>削除</button>
      )}
    </div>
  );
};

export default Tweet;
