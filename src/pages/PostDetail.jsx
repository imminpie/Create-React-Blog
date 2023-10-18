import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

  const handleCandle = (cancled) => {
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
    <>
      {filtered.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>{post.content}</p>
        </div>
      ))}
      <div>
        <Link to={`/post/edit/${params.id}`} state={{ post: filtered }}>
          <button type='button'>수정</button>
        </Link>
        <button onClick={handleShow}>삭제</button>
      </div>
      {isModal && (
        <IsModal
          params={params}
          onCancle={handleCandle}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

function readTodoFromLocalStorage() {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}

function getFilteredItems(store, params) {
  return store.filter((post) => post.id === params.id);
}
