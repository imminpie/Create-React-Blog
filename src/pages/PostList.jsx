import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/PostList.module.css';

export default function PostList() {
  const [posts, setPosts] = useState(() => readTodoFromLocalStorage());
  return (
    <main className='wrap'>
      <ul className={`${styles.list} inner`}>
        {posts.map((post) => (
          <li className={styles.list_item} key={post.id}>
            <Link to={`/post/${post.id}`}>
              <div className={styles.contents_area}>
                <p className={`${styles.title} text_overflow`}>{post.title}</p>
                <p
                  className={`${styles.content} text_overflow`}
                  dangerouslySetInnerHTML={{
                    __html: post.content.replaceAll(/(<([^>]+)>)/gi, ''),
                  }}
                ></p>
              </div>
              <p className={styles.date}>{post.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

function readTodoFromLocalStorage() {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}
