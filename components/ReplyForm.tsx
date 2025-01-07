// components/ReplyForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { useSWRConfig } from "swr";

type Props = {
  tweetId: string;
};

export default function ReplyForm({ tweetId }: Props) {
  const { mutate } = useSWRConfig();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/tweets/${tweetId}/replies`, { content });
      setContent("");
      mutate(`/api/tweets/${tweetId}/replies`); // revalidate
    } catch (err) {
      console.error("Reply post error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a reply..."
      />
      <button type="submit">Reply</button>
    </form>
  );
}
