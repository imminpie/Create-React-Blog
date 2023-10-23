import React, { useState } from 'react';
import styles from '../css/Category.module.css';

export default function Category({ filters, onFilterChange, posts }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className={styles.categories}>
      <button
        type='button'
        name='all'
        onClick={() => handleClick('all')}
        className={activeFilter === 'all' ? 'active' : ''}
      >
        전체보기 ({posts.length})
      </button>
      {filters.map((item, idx) => (
        <button
          type='button'
          key={idx}
          name={item}
          onClick={() => handleClick(item)}
          className={activeFilter === item ? 'active' : ''}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
