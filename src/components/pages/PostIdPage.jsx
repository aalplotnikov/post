import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFetching} from '../../hooks/useFetching';
import PostService from '../../API/PostService';
import Loader from '../UI/loader/Loader';

const PostIdPage = () => {
  const {id} = useParams();
  const [post, setPost] =useState({});
  const [comments, setComments] =useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data)
  });

  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
    const response = await PostService.getCommentsById(id);
    setComments(response.data)
  });

  useEffect(() => {
    fetchPostById(id);
    fetchComments(id);
  },[]);

  return (
    <div>
      <h1>Вы открыли страницу поста с ID {id}</h1>
      {
        isLoading
          ? <Loader/>
          : <div>
              {post.id}. {post.title}
            </div>
      }
      <h1>Комментарии</h1>
      {
        isCommentsLoading
          ? <Loader/>
          : comments.map((comment) =>
              <div style={{marginTop: '15px'}} key={comment.id}>
                <h5>{comment.email}</h5>
                <div>{comment.body}</div>
              </div>
            )
      }
    </div>
  );
};

export default PostIdPage;