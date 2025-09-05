import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import BlogIndex from './pages/BlogIndex';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage.tsx';

import App from './App.tsx';
import './App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='blog' element={<BlogIndex />} />
          <Route path='blog/:slug' element={<PostPage />} />
          <Route path='about' element={<AboutPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
