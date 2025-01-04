// src/pages/users/[id].tsx
import { GetServerSideProps, NextPage } from 'next';
import dbConnect from '../../utils/dbConnect';
import { User } from '../../models/User';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

interface IUserData {
  _id: string;
  email: string;
  name?: string;
  image?: string;
  following: string[];
  followers: string[];
}

interface UserPageProps {
  user?: IUserData | null;
}

const UserPage: NextPage<UserPageProps> = ({ user }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!user) {
    return <div>ユーザーが存在しません</div>;
  }

  // フォロー操作
  const handleFollow = async () => {
    try {
      await axios.post('/api/follow', { targetUserId: user._id });
      router.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.delete('/api/follow', { data: { targetUserId: user._id } });
      router.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const isLoggedIn = session?.user?.id;
  const isMe = session?.user?.id === user._id;
  const isFollowing = user.followers?.includes(String(session?.user?.id));

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>{user.name || 'No Name'}</h2>
      <img
        src={user.image || '/default-profile.png'}
        alt="profile"
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
      <p>Email: {user.email}</p>
      <div>
        <span>フォロー中: {user.following?.length || 0}</span> /{' '}
        <span>フォロワー: {user.followers?.length || 0}</span>
      </div>
      {isLoggedIn && !isMe && (
        <div style={{ marginTop: '1rem' }}>
          {isFollowing ? (
            <button onClick={handleUnfollow}>アンフォロー</button>
          ) : (
            <button onClick={handleFollow}>フォロー</button>
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    await dbConnect();
    const { id } = context.params || {};
    if (!id) {
      return { props: { user: null } };
    }
    const foundUser = await User.findById(id).lean();
    if (!foundUser) {
      return { props: { user: null } };
    }
    // JSON 変換
    const userData = JSON.parse(JSON.stringify(foundUser));

    return { props: { user: userData } };
  } catch (err) {
    console.error(err);
    return { props: { user: null } };
  }
};

export default UserPage;
