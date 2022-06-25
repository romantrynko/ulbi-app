import About from '../pages/About';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import Login from '../pages/Login';

export const privateRoutes = [
  { path: '/about', element: <About /> },
  { path: '/posts/:id', element: <PostIdPage /> },
  { path: '/posts', element: <Posts /> }
];

export const publicRoutes = [{ path: '/login', element: <Login /> }];
