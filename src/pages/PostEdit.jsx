import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/PostForm.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PostEdit() {
  const location = useLocation();

  const [store, setStore] = useState(() => readTodoFromLocalStorage());
  const [post, setPost] = useState(location.state.post[0]);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isPost, setIsPost] = useState(false);
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPost((prev) => ({
      ...prev,
      title,
      content,
    }));
    setIsPost(!isPost);
  };

  useEffect(() => {
    if (isPost) {
      setStore(store.map((prev) => (prev.id === post.id ? post : prev)));
      setStatus(!status);
    }
  }, [isPost]);

  useEffect(() => {
    if (status) {
      status && localStorage.setItem('posts', JSON.stringify(store));
      navigate(`/post/${post.id}`);
    }
  }, [status]);

  return (
    <form className='wrap' onSubmit={handleSubmit}>
      <div className={`${styles.form} inner`}>
        <input
          type='text'
          name='title'
          value={title}
          onChange={handleChange}
          placeholder='제목을 입력하세요'
        />
        <ReactQuill
          value={content}
          theme='snow'
          onChange={setContent}
          placeholder='내용을 입력하세요.'
        />
      </div>
      <div className={styles.button_area}>
        <div className={`${styles.buttons} inner`}>
          <button
            onClick={() => navigate(`/post/${post.id}`)}
            className={styles.cancle}
          >
            <FaArrowLeft />
            <span>나가기</span>
          </button>
          <button type='submit' className='button button_primary'>
            수정
          </button>
        </div>
      </div>
    </form>
  );
}

function readTodoFromLocalStorage() {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}
