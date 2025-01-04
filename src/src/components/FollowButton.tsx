// src/components/FollowButton.tsx
import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  targetUserId: string;
  isFollowing?: boolean;
};

export default function FollowButton({ targetUserId, isFollowing }: Props) {
  const [following, setFollowing] = useState(isFollowing);

  const handleClick = async () => {
    try {
      if (!following) {
        // フォロー
        await axios.post('/api/follow', { targetUserId });
        setFollowing(true);
      } else {
        // アンフォロー
        await axios.delete('/api/follow', { data: { targetUserId } });
        setFollowing(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleClick} style={{ background: '#48f', color: '#fff', marginTop: '1rem' }}>
      {following ? 'フォロー中' : 'フォローする'}
    </button>
  );
}
