import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from '../css/PostDetail.module.css';
import IsModal from '../components/IsModal';

export default function PostDetail() {
  const params = useParams();
  const [store, setStore] = useState(() => readTodoFromLocalStorage());
  const [isModal, setIsModal] = useState(false);
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();
  const filtered = getFilteredItems(store, params);

  const handleShow = (e) => {
    e.preventDefault();
    setIsModal((show) => !show);
  };

  const handleCandle = () => {
    setIsModal((cancled) => !cancled);
  };

  const handleDelete = (deleted) => {
    setStore(store.filter((post) => post.id !== deleted.id));
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
    <section className='wrap'>
      <div className={`${styles.contents} inner`}>
        {filtered.map((post) => (
          <div key={post.id}>
            <p className={styles.title}>{post.title}</p>
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
            <button onClick={handleShow} className='button button_danger'>
              삭제
            </button>
          </div>
        </div>
        {isModal && (
          <IsModal
            params={params}
            onCancle={handleCandle}
            onDelete={handleDelete}
            show={isModal}
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
