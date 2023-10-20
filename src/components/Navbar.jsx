import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from '../css/Navbar.module.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const handleClick = () => {
    if (pathname === '/post/new') {
      window.location.reload();
    }
  };
  return (
    <header className={`${styles.header} wrap`}>
      <nav className={`${styles.nav} inner`}>
        <Link to='/'>
          <h1 className={styles.logo}>BLOG</h1>
        </Link>
        <Link to='/post/new' className={styles.new} onClick={handleClick}>
          새 글 작성
        </Link>
      </nav>
    </header>
  );
}
