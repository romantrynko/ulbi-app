import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import { privateRoutes, publicRoutes } from '../router/index';
import { useContext } from 'react';
import { AuthContext } from '../context/index';
import Loader from './UI/Loader/Loader';

export default function AppRouter() {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }
  
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route, key) => {
        return <Route path={route.path} element={route.element} key={key} />;
      })}
      <Route path="*" element={<Navigate repllace to="/posts" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route, key) => {
        return <Route path={route.path} element={route.element} key={key} />;
      })}
      <Route path="*" element={<Navigate repllace to="/login" />} />
    </Routes>
  );
}
