import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header>
      <Link to='/'>
        <h1>블로그</h1>
      </Link>
      <Link to='/post/new'>새 글 작성</Link>
    </header>
  );
}
