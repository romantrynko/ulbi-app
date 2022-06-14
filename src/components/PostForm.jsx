import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

export default function PostForm({ create }) {
  const [post, setPost] = useState({
    title: '',
    body: ''
  });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post, id: Date.now()
    };
    create(newPost);
    setPost({
      title: '',
      body: ''
    });
  };

  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Post name"
      />

      <MyInput
        /*ref={bodyInputRef} ----- uncontroled component */
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Post decription"
      />

      <MyButton onClick={addNewPost}>Add post</MyButton>
    </form>
  );
}
