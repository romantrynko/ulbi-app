import React from 'react';
import MyButton from './UI/button/MyButton';
import { useNavigate } from 'react-router-dom';

export default function PostItem({ remove, number, post }) {
  const { title, body, id } = post;

  const navigate = useNavigate();

  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {id}. {title}
        </strong>
        <div>{body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => navigate(`/posts/${id}`)}>Open</MyButton>
        <MyButton onClick={() => remove(post)}>Delete</MyButton>
      </div>
    </div>
  );
}
