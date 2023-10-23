import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from '../css/PostDetail.module.css';
import ModalWrapper from '../components/ModalWrapper';

export default function PostDetail() {
  const params = useParams();

  const [storedPosts, setStoredPosts] = useState(() =>
    getPostsFromLocalStorage()
  );
  const [storedTags, setStoredTags] = useState(() => getTagsFromLocalStorage());

  const [status, setStatus] = useState(false);
  const [isModal, setIsModal] = useState({
    status: false,
    title: '',
    cancle: true,
  });

  const navigate = useNavigate();
  const filtered = getFilteredItems(storedPosts, params);

  const handleModal = (e) => {
    e.preventDefault();
    setIsModal({ status: true, title: '정말 삭제하시겠습니까?', cancle: true });
  };

  const handleDelete = () => {
    setStoredPosts(storedPosts.filter((post) => post.id !== params.id));
    setStoredTags(storedTags.filter((post) => post.id !== params.id));
    setStatus(!status);
  };

  const handleCancle = () => {
    setIsModal({ status: !isModal, title: '', cancle: true });
  };

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(storedPosts));
    localStorage.setItem('tags', JSON.stringify(storedTags));
    if (status === true) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedPosts, status]);

  return (
    <section className='wrap'>
      <div className={`${styles.contents} inner`}>
        {filtered.map((post) => (
          <div key={post.id}>
            <p className={styles.title}>{post.title}</p>
            <p className={styles.date}>{post.date}</p>
            <div className={styles.tag_area}>
              {storedTags.map(
                (item) =>
                  item.id === post.id &&
                  item.tag.map((value) => (
                    <div className={styles.tag} key={value}>{`# ${value}`}</div>
                  ))
              )}
            </div>
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
          <ModalWrapper
            show={isModal}
            onConfirm={handleDelete}
            onCancle={handleCancle}
          />
        )}
      </div>
    </section>
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

function getFilteredItems(store, params) {
  return store.filter((post) => post.id === params.id);
}
