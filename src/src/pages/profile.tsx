// src/pages/profile.tsx
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [image, setImage] = useState(session?.user?.image || '');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    try {
      const res = await axios.post('/api/profile', { name, image });
      setMessage('更新しました');
    } catch (err) {
      console.error(err);
      setMessage('エラーが発生しました');
    }
  };

  if (!session) {
    return <div>ログインしてください</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>プロフィール編集</h2>
      <div>
        <label>名前: </label>
        <input
          type="text"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>画像URL: </label>
        <input
          type="text"
          value={image || ''}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>保存</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfilePage;
