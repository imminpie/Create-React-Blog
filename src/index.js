import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './Quill.css';
import App from './App';
import PostList from './pages/PostList';
import PostNew from './pages/PostNew';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <p>Not Found 😅</p>,
    children: [
      { index: true, path: '/', element: <PostList /> },
      {
        path: '/post/new',
        element: <PostNew />,
      },
      {
        path: 'post/:id',
        element: <PostDetail />,
      },
      {
        path: 'post/edit/:id',
        element: <PostEdit />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
