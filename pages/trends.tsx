// pages/trends.tsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function TrendsPage() {
  const [trends, setTrends] = useState<any[]>([]);
  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await axios.get("/api/trends");
        setTrends(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrends();
  }, []);

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Trends</h1>
      <ul className="space-y-2">
        {trends.map((t) => (
          <li key={t.id} className="border p-2 rounded">
            <span className="font-semibold">#{t.tag}</span> - {t.count} 
          </li>
        ))}
      </ul>
    </Layout>
  );
}
