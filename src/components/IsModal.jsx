import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../css/Modal.module.css';

export default function IsModal({ params, onCancle, onDelete, show }) {
  const handleCancle = (e) => {
    e.preventDefault();
    onCancle(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(params);
  };
  return (
    <Modal show={show}>
      <Modal.Header className={styles.header}>
        <Modal.Title className={styles.title}>⚠️</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.body}>
        게시글을 삭제하시겠습니까?
      </Modal.Body>
      <Modal.Footer className={styles.footer}>
        <Button
          className={`${styles.btn} ${styles.btn_cancle}`}
          onClick={handleCancle}
        >
          취소
        </Button>
        <Button
          className={`${styles.btn} ${styles.btn_primary}`}
          onClick={handleDelete}
        >
          삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
