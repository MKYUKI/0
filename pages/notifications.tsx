// pages/notifications.tsx
import React from "react";
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function NotificationsPage() {
  const { data: session, status } = useSession();
  const { data: notifications, mutate } = useSWR(
    session ? "/api/notifications" : null,
    fetcher
  );

  if (status === "loading") {
    return <Layout>Loading...</Layout>;
  }
  if (!session) {
    return <Layout>Please sign in</Layout>;
  }

  const handleMarkRead = async (id: string) => {
    try {
      await axios.post("/api/notifications/read", { notificationId: id });
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      {!notifications ? (
        <p>Loading notifications...</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif: any) => (
            <div
              key={notif.id}
              className={`p-3 border rounded ${notif.read ? "bg-gray-100" : "bg-white"}`}
            >
              <p>{notif.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(notif.createdAt).toLocaleString()}
              </p>
              {!notif.read && (
                <button
                  onClick={() => handleMarkRead(notif.id)}
                  className="mt-2 px-2 py-1 text-sm bg-blue-500 text-white rounded"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
