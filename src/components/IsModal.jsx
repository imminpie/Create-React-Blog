import React from 'react';

export default function IsModal({ params, onCancle, onDelete }) {
  const handleCancle = (e) => {
    e.preventDefault();
    onCancle(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(params);
  };
  return (
    <div>
      <h1>⚠️</h1>
      <p>삭제하시겠습니까?</p>
      <button onClick={handleCancle}>취소</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}
