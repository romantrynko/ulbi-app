import React from 'react';
import MyButton from './UI/button/MyButton';

export default function PostItem({ remove, number, post }) {
  const { title, body } = post;
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {number}. {title}
        </strong>
        <div>{body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => remove(post)}>Delete</MyButton>
      </div>
    </div>
  );
}
