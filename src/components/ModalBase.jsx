import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../css/Modal.module.css';

export default function ModalBase(props) {
  const { status, title, cancle } = props.show;
  const handleClick = () => {
    props.onConfirm();
  };
  const handleCancle = () => {
    props.onCancle();
  };
  return (
    <Modal show={status}>
      <Modal.Header className={styles.header}>
        <Modal.Title className={styles.title}>⚠️</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.body}>{title}</Modal.Body>
      <Modal.Footer className={styles.footer}>
        <Button
          className={`${styles.btn} ${styles.btn_primary}`}
          onClick={handleClick}
        >
          확인
        </Button>
        {cancle && (
          <Button
            className={`${styles.btn} ${styles.btn_cancle}`}
            onClick={handleCancle}
          >
            취소
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
