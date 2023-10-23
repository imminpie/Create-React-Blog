import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/PostList.module.css';
import Category from '../components/Category';

export default function PostList() {
  const [posts, setPosts] = useState(() => getPostsFromLocalStorage());
  const [tags, setTages] = useState(() => getTagsFromLocalStorage());

  const filters = [...new Set(tags.flatMap((item) => item.tag))];

  const [filter, setFilter] = useState('all');
  const filtered = getFilteredItems(posts, tags, filter);

  return (
    <main className='wrap'>
      <div className={`${styles.list_area} inner`}>
        <Category onFilterChange={setFilter} filters={filters} posts={posts} />
        <ul className={`${styles.list}`}>
          {filtered.map((post) => (
            <li className={styles.list_item} key={post.id}>
              <Link to={`/post/${post.id}`}>
                <div className={styles.contents_area}>
                  <p className={`${styles.title} text_overflow`}>
                    {post.title}
                  </p>
                  <p
                    className={`${styles.content} text_overflow`}
                    dangerouslySetInnerHTML={{
                      __html: post.content.replaceAll(/(<([^>]+)>)/gi, ''),
                    }}
                  ></p>
                  <div className={styles.tag_area}>
                    {tags.map(
                      (item) =>
                        item.id === post.id &&
                        item.tag.map((value) => (
                          <div
                            className={styles.tag}
                            key={value}
                          >{`# ${value}`}</div>
                        ))
                    )}
                  </div>
                </div>
                <p className={styles.date}>{post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
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

function getFilteredItems(posts, tags, filter) {
  if (filter === 'all') {
    return posts;
  }

  return posts.filter((post) => {
    return tags.some((tag) => tag.tag.includes(filter) && tag.id === post.id);
  });
}
