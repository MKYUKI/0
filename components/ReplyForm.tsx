import React, { useState } from "react";
import axios from "axios";
import { useSWRConfig } from "swr"; // ← swrからimport

type Props = {
  tweetId: string;
};

export default function ReplyForm({ tweetId }: Props) {
  const { mutate } = useSWRConfig(); // ← ここで使用OK
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await axios.post(`/api/tweets/${tweetId}/reply`, { content });
      mutate(`/api/tweets/${tweetId}`); // ← revalidation
      setContent("");
    } catch (error) {
      console.error("Reply submit error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your reply..."
      />
      <button type="submit">Reply</button>
    </form>
  );
}
