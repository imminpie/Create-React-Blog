import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/PostForm.module.css';
import ModalWrapper from '../components/ModalWrapper';
import { FaArrowLeft } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TagItem from '../components/TagItem';

export default function PostEdit() {
  const createDate = new Date().getTime();
  const location = useLocation();
  const navigate = useNavigate();
  const titleInput = useRef();
  const contentInput = useRef();

  const [storedPosts, setStoredPosts] = useState(() => getPostsFromLocalStorage());
  const [post, setPost] = useState(location.state.post[0]);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isPost, setIsPost] = useState(false);
  const [status, setStatus] = useState(false);
  const [isModal, setIsModal] = useState({
    status: false,
    title: '',
    cancle: false,
  });

  const [storedTags, setStoredTags] = useState(() => getTagsFromLocalStorage());
  const [tagList, setTagList] = useState(
    storedTags.filter((item) => item.id === post.id && item)[0]
  );

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleHashTag = (updated) => {
    setTagList((prev) => ({
      ...prev,
      tag: [...updated],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      titleInput.current.focus();
      return handleEmptyFields('제목을 입력하세요');
    }

    if (content.trim().replaceAll(/<[^>]*>?/g, '').length === 0) {
      contentInput.current.focus();
      return handleEmptyFields('내용을 입력하세요');
    }

    setPost((prev) => ({
      ...prev,
      title,
      content,
      date: new Date(createDate).toLocaleDateString(),
    }));

    setStoredTags(storedTags.map((item) => (item.id === post.id ? tagList : item)));

    setIsPost(!isPost);
  };

  const handleEmptyFields = (title) => {
    setIsModal({ status: true, title: title, cancle: false });
  };

  const handleCandle = () => {
    setIsModal({ status: !isModal, title: '', cancle: false });
  };

  useEffect(() => {
    if (isPost) {
      setStoredPosts(storedPosts.map((prev) => (prev.id === post.id ? post : prev)));
      setStatus(!status);
    }
    // eslint-disable-next-line
  }, [isPost, post]);

  useEffect(() => {
    if (status) {
      localStorage.setItem('posts', JSON.stringify(storedPosts));
      localStorage.setItem('tags', JSON.stringify(storedTags));
      navigate(`/post/${post.id}`);
    }
    // eslint-disable-next-line
  }, [status]);

  return (
    <form className='wrap' onSubmit={handleSubmit}>
      <div className={`${styles.form} inner`}>
        <input
          type='text'
          name='title'
          value={title}
          ref={titleInput}
          onChange={handleChange}
          placeholder='제목을 입력하세요'
          className='input'
        />
        <TagItem onTag={handleHashTag} store={tagList.tag} />
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
          <button onClick={() => navigate(`/post/${post.id}`)} className={styles.cancle}>
            <FaArrowLeft />
            <span>나가기</span>
          </button>
          <button type='submit' className='button button_primary'>
            수정
          </button>
        </div>
      </div>
      {isModal && <ModalWrapper show={isModal} onConfirm={handleCandle} />}
    </form>
  );
}

function getPostsFromLocalStorage() {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}

function getTagsFromLocalStorage() {
  const tags = localStorage.getItem('tags');
  return tags ? JSON.parse(tags) : [];
}
