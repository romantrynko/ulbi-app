import React, { useEffect, useRef, useState } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/modal/MyModal';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import Loader from '../components/UI/Loader/Loader';
import PostList from '../components/PostList';
import Pagination from '../components/UI/pagination/Pagination';
import { usePosts } from '../hooks/usePost';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import { getPageCount } from '../components/utils/pages';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const lastElement = useRef();
  const observer = useRef();
  console.log(lastElement);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    if (isPostsLoading) return;
    if (observer.current) observer.current.disconnect();
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && page < totalPages) {
        console.log(page);
        setPage(page + 1);
      }
    };

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
  }, [isPostsLoading]);

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((item) => item.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: '15px' }} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '10px 0' }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      {postError && <h1>Error! {postError}</h1>}

      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={'Posts about JS'}
      />
      <div ref={lastElement}></div>
      {isPostsLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px'
          }}
        >
          <Loader />
        </div>
      )}
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      ></Pagination>
    </div>
  );
}

export default Posts;
