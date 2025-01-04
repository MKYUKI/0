// src/components/TweetItem.tsx
import React from 'react';
import Link from 'next/link';

export interface TweetType {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: string[];
}

type Props = {
  tweet: TweetType;
};

export default function TweetItem({ tweet }: Props) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '0.5rem 0', padding: '0.5rem' }}>
      <p>{tweet.content}</p>
      <div style={{ fontSize: '0.8rem', color: '#666' }}>
        by{' '}
        <Link href={`/users/${tweet.author}`}>
          @{tweet.author.substring(0,5)}...
        </Link>{' '}
        at {new Date(tweet.createdAt).toLocaleString()}
      </div>
      <div>いいね: {tweet.likes.length}</div>
    </div>
  );
}
