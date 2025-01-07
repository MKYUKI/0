// pages/profile/[userid].tsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function UserProfilePage() {
  const router = useRouter();
  const { userid } = router.query as { userid?: string };
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!userid) return;
    // GET /api/users/[userid] などで取得
    fetch(`/api/users/${userid}`)
      .then((res) => res.json())
      .then(setProfile)
      .catch(console.error);
  }, [userid]);

  async function handleFollow() {
    if (!userid) return;
    const res = await fetch("/api/users/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetUserId: userid }),
    });
    if (res.ok) {
      alert("Followed!");
    } else {
      alert("Follow error");
    }
  }

  if (!profile) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>ユーザプロフィール</h1>
      <p>ID: {profile.id}</p>
      <p>Name: {profile.name}</p>
      <p>Username: {profile.username}</p>

      {session?.user?.id !== profile.id && (
        <button onClick={handleFollow}>Follow</button>
      )}
    </div>
  );
}
