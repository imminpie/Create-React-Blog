import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function PostNew() {
  const [post, setPost] = useState({ id: '', title: '', content: '' });
  const [store, setStore] = useState(() => readTodoFromLocalStorage());
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const titleInput = useRef();
  const contentInput = useRef();

  const handleChange = (e) => {
    setPost((prev) => ({
      ...prev,
      id: uuidv4(),
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!post.title.trim()) {
      titleInput.current.focus();
      return alert('제목을 입력하세요.');
    }

    if (!post.content.trim()) {
      contentInput.current.focus();
      return alert('내용을 입력하세요.');
    }

    setStore((prev) => [...prev, post]);
    setPost({ id: '', title: '', content: '' });
    setStatus(!status);
  };

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(store));
    if (status === true) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, status]);

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        ref={titleInput}
        name='title'
        value={post.title}
        onChange={handleChange}
        placeholder='제목을 입력하세요'
      />
      <textarea
        className='textarea'
        ref={contentInput}
        name='content'
        value={post.content}
        onChange={handleChange}
        placeholder='내용을 입력하세요'
      ></textarea>
      <div className='buttons'>
        <button type='submit' className='btn'>
          등록
        </button>
        <button type='button' className='btn' onClick={() => navigate('/')}>
          취소
        </button>
      </div>
    </form>
  );
}

function readTodoFromLocalStorage() {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}
