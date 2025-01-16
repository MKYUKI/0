// components/NavBar.tsx
import React from 'react'
import Link from 'next/link'

export default function NavBar(): JSX.Element {
  return (
    <header className="global-nav-bar">
      <span className="nav-bar-title">GPT-4 Model</span>
      <nav className="nav-bar-links">
        <Link href="/"><span className="nav-link">Page1</span></Link>
        <Link href="/page2"><span className="nav-link">Page2</span></Link>
        <Link href="/page3"><span className="nav-link">Page3</span></Link>
        <Link href="/page4"><span className="nav-link">Page4</span></Link>
        <Link href="/page5"><span className="nav-link">Page5</span></Link>
        <Link href="/page6"><span className="nav-link">Page6</span></Link>
      </nav>
    </header>
  )
}
