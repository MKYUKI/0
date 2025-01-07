import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type User = {
  id: string;
  name?: string | null;
  username?: string | null;
};

type Like = {
  id: string;
  userId: string;
};

type Tweet = {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  likes: Like[];
};

export default function FeedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      // 未ログインならSigninへ
      router.push("/api/auth/signin");
    } else {
      fetchTweets();
    }
  }, [status, session]);

  async function fetchTweets() {
    try {
      const res = await fetch("/api/tweets");
      if (res.ok) {
        const data = await res.json();
        setTweets(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePostTweet(e: React.FormEvent) {
    e.preventDefault();
    if (!newContent.trim()) return;
    try {
      const res = await fetch("/api/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent }),
      });
      if (res.ok) {
        setNewContent("");
        fetchTweets();
      } else {
        alert("Failed to post tweet");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function isLikedByMe(tweet: Tweet) {
    return tweet.likes.some((lk) => lk.userId === session?.user?.id);
  }

  async function toggleLike(tweetId: string) {
    const tweet = tweets.find((t) => t.id === tweetId);
    if (!tweet) return;
    const liked = isLikedByMe(tweet);
    const method = liked ? "DELETE" : "POST";
    const url = `/api/tweets/like?tweetId=${tweetId}`;
    try {
      const res = await fetch(url, { method });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Like failed");
        return;
      }
      fetchTweets();
    } catch (err) {
      console.error(err);
    }
  }

  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>Redirecting...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1 style={{ color: "#220088", textAlign: "center" }}>
        Next-Gen X Clone
      </h1>

      {/* Tweet投稿フォーム */}
      <form onSubmit={handlePostTweet} style={{ marginBottom: 16 }}>
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={3}
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="今どうしてる？"
        />
        <button type="submit" style={{ backgroundColor: "#550099", color: "#fff", padding: "6px 12px", borderRadius: 4 }}>
          Tweet
        </button>
      </form>
      <hr />

      {/* ツイート一覧 */}
      {tweets.map((tw) => {
        const liked = isLikedByMe(tw);
        const likeCount = tw.likes.length;
        return (
          <div key={tw.id} style={{ borderBottom: "1px solid #ccc", padding: "8px 0" }}>
            <div style={{ color: "#330066", fontWeight: "bold" }}>
              @{tw.user.username ?? tw.user.name ?? "NoName"}
            </div>
            <p style={{ margin: 0, color: "#550055" }}>{tw.content}</p>
            <small>{new Date(tw.createdAt).toLocaleString()}</small>
            <div>
              <button
                onClick={() => toggleLike(tw.id)}
                style={{
                  backgroundColor: liked ? "#990044" : "#000000",
                  color: "#fff",
                  marginTop: 4,
                  padding: "4px 8px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                {liked ? "Liked" : "Like"} ({likeCount})
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
