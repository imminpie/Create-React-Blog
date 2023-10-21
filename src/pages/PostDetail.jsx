import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from '../css/PostDetail.module.css';
import ModalBase from '../components/ModalBase';

export default function PostDetail() {
  const params = useParams();

  const [store, setStore] = useState(() => readTodoFromLocalStorage());
  const [status, setStatus] = useState(false);
  const [isModal, setIsModal] = useState({status: false, title: '', cancle: true,});

  const navigate = useNavigate();
  const filtered = getFilteredItems(store, params);

  const handleModal = (e) => {
    e.preventDefault();
    setIsModal({ status: true, title: '정말 삭제하시겠습니까?', cancle: true });
  };

  const handleDelete = () => {
    setStore(store.filter((post) => post.id !== params.id));
    setStatus(!status);
  };

  const handleCandle = () => {
    setIsModal({ status: !isModal, title: '', cancle: true });
  };

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(store));
    if (status === true) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, status]);

  return (
    <section className='wrap'>
      <div className={`${styles.contents} inner`}>
        {filtered.map((post) => (
          <div key={post.id}>
            <p className={styles.title}>{post.title}</p>
            <p className={styles.date}>{post.date}</p>
            <p
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></p>
          </div>
        ))}
        <div className={styles.button_area}>
          <div className={`${styles.buttons} inner`}>
            <Link to={`/post/edit/${params.id}`} state={{ post: filtered }}>
              <button type='button' className='button button_primary'>
                수정
              </button>
            </Link>
            <button onClick={handleModal} className='button button_danger'>
              삭제
            </button>
          </div>
        </div>
        {isModal && (
          <ModalBase
            show={isModal}
            onConfirm={handleDelete}
            onCancle={handleCandle}
          />
        )}
      </div>
    </section>
  );
}

function readTodoFromLocalStorage() {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}

function getFilteredItems(store, params) {
  return store.filter((post) => post.id === params.id);
}
