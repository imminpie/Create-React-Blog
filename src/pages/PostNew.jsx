import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from '../css/PostForm.module.css';
import ModalBase from '../components/ModalBase';
import { FaArrowLeft } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PostNew() {
  const createDate = new Date().getTime();
  const navigate = useNavigate();
  const titleInput = useRef();
  const contentInput = useRef();

  const [store, setStore] = useState(() => readTodoFromLocalStorage());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(false);
  const [isModal, setIsModal] = useState({status: false, title: '', cancle: false,});

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      titleInput.current.focus();
      return handleEmptyFields('제목을 입력하세요');
    }

    if (content.trim().length === 0) {
      contentInput.current.focus();
      return handleEmptyFields('내용을 입력하세요');
    }
    setStore((prev) => [
      ...prev,
      {
        id: uuidv4(),
        title: title,
        content: content,
        date: new Date(createDate).toLocaleDateString(),
      },
    ]);
    setStatus(!status);
  };

  const handleEmptyFields = (title) => {
    setIsModal({ status: true, title: title, cancle: false });
  };

  const handleCandle = () => {
    setIsModal({ status: !isModal, title: '', cancle: false });
  };

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(store));
    status && navigate('/');
  }, [status]);

  return (
    <form onSubmit={handleSubmit} className='wrap'>
      <div className={`${styles.form} inner`}>
        <input
          type='text'
          value={title}
          ref={titleInput}
          onChange={handleChange}
          placeholder='제목을 입력하세요.'
        />
        <ReactQuill
          value={content}
          theme='snow'
          ref={contentInput}
          onChange={setContent}
          placeholder='내용을 입력하세요.'
        />
      </div>
      <div className={styles.button_area}>
        <div className={`${styles.buttons} inner`}>
          <button onClick={() => navigate('/')} className={styles.cancle}>
            <FaArrowLeft />
            <span>나가기</span>
          </button>
          <button type='submit' className='button button_primary'>
            등록
          </button>
        </div>
      </div>
      {isModal && <ModalBase show={isModal} onConfirm={handleCandle} />}
    </form>
  );
}

function readTodoFromLocalStorage() {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}
