// pages/profile.tsx
import React from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";

// フェッチャー関数 (SWR用)
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Profile() {
  // "/api/users" の一覧をSWRで取得する例
  const { data: users, error, isLoading } = useSWR("/api/users", fetcher);

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users.</div>;
  if (!users) return <div>No users found.</div>;

  // フォロー処理 (例)
  async function handleFollow(userId: string) {
    try {
      await axios.post("/api/users/follow", { userId });
      // フォロー処理後に /api/users のキャッシュを再検証
      await mutate("/api/users");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>
            {u.name || u.email}{" "}
            <button onClick={() => handleFollow(u.id)}>Follow</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
