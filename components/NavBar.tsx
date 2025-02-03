import React from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <header
      className="navbar"
      style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className="nav-left" style={{ display: 'flex', alignItems: 'center' }}>
        <Link href="/">
          <a className="nav-link" style={{ marginRight: '16px' }}>Home</a>
        </Link>
        <Link href="/aichat">
          <a className="nav-link" style={{ marginRight: '16px' }}>AI Chat</a>
        </Link>
        <Link href="/art">
          <a className="nav-link" style={{ marginRight: '16px' }}>Art</a>
        </Link>
        <Link href="/excelvba">
          <a className="nav-link" style={{ marginRight: '16px' }}>ExcelVBA</a>
        </Link>
        <Link href="/contact">
          <a className="nav-link" style={{ marginRight: '16px' }}>Contact</a>
        </Link>
        {/* Booksリンクは削除 */}
      </div>
      <div className="nav-right">
        <SearchBar />
      </div>
    </header>
  );
}
