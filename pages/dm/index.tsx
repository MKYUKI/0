// pages/dm/index.tsx
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DMListPage() {
  const { data: session } = useSession();
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/dm");
        setRooms(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [session]);

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Direct Messages</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {rooms.map((room) => (
            <li key={room.id} className="border p-2 rounded">
              <p>Room ID: {room.id}</p>
              <p>
                Participants:{" "}
                {room.participants.map((p: any) => p.name || p.email).join(", ")}
              </p>
              <Link href={`/dm/${room.id}`}>
                <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
                  Enter
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
