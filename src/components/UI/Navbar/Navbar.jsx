import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context/index';

export default function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = event => {
    event.preventDefault();
    setIsAuth(false);
    localStorage.removeItem('auth')
  }

  return (
    <div className="navbar">
      {isAuth && <MyButton onClick={logout}>Exit</MyButton>}
      <div className="navbar__links">
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
      </div>
    </div>
  );
}
