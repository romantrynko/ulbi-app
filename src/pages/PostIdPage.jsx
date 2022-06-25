import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostItem from '../components/PostItem';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

export default function PostIdPage() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getPostById(params.id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async () => {
    const response = await PostService.getCommentsById(params.id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1>
            {post.id}. {post.title}
          </h1>
          <article>{post.body}</article>
        </div>
      )}
      <h3>Comments</h3>
      {isComLoading ? (
        <Loader />
      ) : (
        comments.map((comment) => (
          <div style={{ marginTop: '10px' }}>
            <h4>
              {comment.id}. {comment.name}
            </h4>
            <p>{comment.body}</p>
          </div>
        ))
      )}
    </div>
  );
}
