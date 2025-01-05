// pages/dm/[roomId].tsx
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../components/Layout";
import { useSession } from "next-auth/react";

export default function DMRoomPage() {
  const router = useRouter();
  const { roomId } = router.query;
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomId || !session) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/dm/${roomId}`);
        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [roomId, session]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim() || !roomId) return;
    try {
      const res = await axios.post(`/api/dm/${roomId}`, { content: newMsg });
      setMessages((prev) => [...prev, res.data]);
      setNewMsg("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">DM Room: {roomId}</h1>
      <div className="border p-4 h-[60vh] overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <p className="text-sm text-gray-600">
              {msg.sender.name || msg.sender.email} -{" "}
              {new Date(msg.createdAt).toLocaleTimeString()}
            </p>
            <p className="bg-gray-200 p-2 rounded">{msg.content}</p>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <div className="flex gap-2">
        <input
          className="border flex-1 p-2"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </Layout>
  );
}
