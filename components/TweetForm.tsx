// components/TweetForm.tsx
import React, { useState } from "react";
import axios from "axios";

type Props = {
  onSuccess?: () => void;
};

export default function TweetForm({ onSuccess }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      setLoading(true);
      await axios.post("/api/tweets", { content });
      setContent("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        className="border p-2 flex-1"
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Tweet
      </button>
    </form>
  );
}
