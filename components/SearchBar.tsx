import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string>('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: query }],
          temperature: 0.7,
          max_tokens: 150,
          presence_penalty: 0,
          frequency_penalty: 0
        })
      });
      const data = await response.json();
      const answer = data?.choices?.[0]?.message?.content || 'No answer';
      setResults(answer);
    } catch (error) {
      console.error('Search error:', error);
      setResults('Error occurred');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          padding: '6px 10px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          marginLeft: '8px',
          padding: '6px 10px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#2187ff',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        Search
      </button>
      {results && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            backgroundColor: '#fff',
            color: '#000',
            padding: '8px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 100,
            maxWidth: '300px'
          }}
        >
          {results}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
