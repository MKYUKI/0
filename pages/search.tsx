// pages/search.tsx
import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("tweet"); // 'tweet' or 'user'
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await axios.get("/api/search", {
        params: { q: query, mode },
      });
      setResults(res.data.results);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Search</h1>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={mode} onChange={(e) => setMode(e.target.value)} className="border p-1">
          <option value="tweet">Tweets</option>
          <option value="user">Users</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {results.map((item) => {
          if (mode === "user") {
            return (
              <div key={item.id} className="border p-2 rounded">
                <p className="font-semibold">
                  {item.name || item.email} ({item.email})
                </p>
              </div>
            );
          } else {
            return (
              <div key={item.id} className="border p-2 rounded">
                <p>
                  <span className="font-semibold">{item.user?.name || item.user?.email}:</span>{" "}
                  {item.content}
                </p>
              </div>
            );
          }
        })}
      </div>
    </Layout>
  );
}
