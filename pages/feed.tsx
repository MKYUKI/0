// pages/feed.tsx
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

export default function FeedPage() {
  const { data: session } = useSession();
  return (
    <Layout>
      <h1>Feed Page</h1>
      {session ? <p>Welcome, {session.user?.email}</p> : <p>Please sign in.</p>}
    </Layout>
  );
}
