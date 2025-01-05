// components/ReplyForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { useSWRConfig } from "swr"; // swr がインストールされていればエラーにならない

type Props = {
  tweetId: string;
};

export function ReplyForm({ tweetId }: Props) {
  const { mutate } = useSWRConfig();
  const [text, setText] = useState("");

  // 送信ロジックなど
  // ...

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await axios.post("/api/tweets/reply", { tweetId, text });
          mutate(`/api/tweets/${tweetId}`); // 再検証
          setText("");
        } catch (err) {
          console.error(err);
        }
      }}
    >
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Reply</button>
    </form>
  );
}

export default ReplyForm;
