import React, { useEffect, useRef, useState } from 'react';
import styles from '../css/Tag.module.css';

export default function TagItem({ onTag, store }) {
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState([...store]);
  const [message, setMessage] = useState(false);

  const inputRef = useRef(null);

  const handleChange = (e) => {
    setTag(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleHashtag();
    }
  };

  const handleHashtag = () => {
    if (tag.trim()) {
      setTagList((prev) => (tagList.includes(tag) ? prev : [...prev, tag]));
      setTag('');
    }
  };

  const handleClick = (e) => {
    const tagName = e.target.innerHTML.replace('#', '').trim();
    setTagList(tagList.filter((item) => item !== tagName));
  };

  const handleMessage = () => {
    setMessage((show) => !show);
  };

  // 외부 영역 클릭 시 메시지 닫힘
  useEffect(() => {
    function handleFocus(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setMessage(false);
      }
    }

    document.addEventListener('mousedown', handleFocus);
    return () => {
      document.removeEventListener('mousedown', handleFocus);
    };
  }, [inputRef]);

  useEffect(() => {
    onTag(tagList);
  }, [tagList]);

  return (
    <div className={styles.tag_area}>
      <div className={styles.tags}>
        {tagList.map((item, idx) => (
          <div className={styles.tag} key={idx} onClick={handleClick}>
            {`# ${item}`}
          </div>
        ))}
      </div>
      <input
        type='text'
        value={tag}
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={styles.input_tag}
        placeholder='태그를 입력하세요.'
        onClick={handleMessage}
      />
      <div className={styles.message}>
        {message && (
          <div className={styles.inside}>
            쉼표 또는 엔터를 입력하여 태그를 등록할 수 있습니다.
            <br />
            등록된 태그를 클릭하면 삭제됩니다. 😊
          </div>
        )}
      </div>
    </div>
  );
}
