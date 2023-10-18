import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PostList() {
  const [posts, setPosts] = useState(() => readTodoFromLocalStorage());
  return (
    <main>
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/post/${post.id}`}>
            <p>{post.title}</p>
          </Link>
          <p>{post.content}</p>
        </div>
      ))}
    </main>
  );
}

function readTodoFromLocalStorage() {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}
