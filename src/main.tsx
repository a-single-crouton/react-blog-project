import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import BlogIndex from './pages/BlogIndex';
import PostPage from './pages/PostPage';

import App from './App.tsx';
import './App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<BlogIndex />} />
          <Route path='post/:slug' element={<PostPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
