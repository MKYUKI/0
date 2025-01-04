// src/components/TweetFeed.tsx
import React from 'react';
import TweetItem, { TweetType } from './TweetItem';

type Props = {
  tweets: TweetType[];
};

export default function TweetFeed({ tweets }: Props) {
  return (
    <div>
      {tweets.map((t) => (
        <TweetItem key={t._id} tweet={t} />
      ))}
    </div>
  );
}
