// src/components/CreateTweet.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  onCreated?: () => void;
}

const CreateTweet: React.FC<Props> = ({ onCreated }) => {
  const [content, setContent] = useState('');

  const handlePost = async () => {
    if (!content.trim()) return;
    try {
      await axios.post('/api/tweets', { content });
      setContent('');
      if (onCreated) onCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <textarea
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: '100%' }}
      />
      <button onClick={handlePost}>ツイート</button>
    </div>
  );
};

export default CreateTweet;
