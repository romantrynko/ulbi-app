import React, { useState, useRef, useMemo } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';

const array = [
  { id: 1, title: 'JS', body: 'dProgramming language' },
  { id: 2, title: 'aJS 2', body: 'fProgramming language' },
  { id: 3, title: 'bJS 3', body: 'Pdrogramming language' },
  { id: 4, title: 'cJS 4', body: 'Pdsdrogramming language' },
  { id: 5, title: 'dJS 5', body: 'jProgramming language' },
  { id: 6, title: 'JS 6', body: 'Programming language' }
];

function App() {
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');

  // const bodyInputRef = useRef(); ----- uncontroled component

  // console.log(bodyInputRef.current.value); ----- uncontroled component
  // };
  const [posts, setPosts] = useState(array);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);

  const sortedPosts = useMemo(() => {
    console.log('Use memo');
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query)
    );
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((item) => item.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '10px 0' }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={'Posts about JS'}
      />
    </div>
  );
}

export default App;
