import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../css/Modal.module.css';

export default function IsAlert({ onCancle, show }) {
  const handleCancle = (e) => {
    e.preventDefault();
    onCancle(false);
  };

  return (
    <Modal show={show.status}>
      <Modal.Header className={styles.header}>
        <Modal.Title className={styles.title}>⚠️</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.body}>{show.title}</Modal.Body>
      <Modal.Footer className={styles.footer}>
        <Button
          className={`${styles.btn} ${styles.btn_cancle}`}
          onClick={handleCancle}
        >
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
