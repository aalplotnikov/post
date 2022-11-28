import React, {useEffect, useMemo, useRef, useState} from 'react';
import '../../styles/App.css'
import PostList from '../PostList';
import MyButton from '../UI/button/MyButton';
import PostForm from '../PostForm';
import PostFilter from '../PostFilter';
import MyModal from '../UI/modalWindow/MyModal';
import {usePosts} from '../../hooks/usePosts';
import PostService from '../../API/PostService';
import Loader from '../UI/loader/Loader';
import {useFetching} from '../../hooks/useFetching';
import {getPageCount} from '../../utils/pages';
import Pagination from '../UI/pagination/pagination';
import {useObserver} from '../../hooks/useObserver';
import MySelect from '../UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const lastElement = useRef();

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPost, isPostLoading, postError] = useFetching(async (page, limit)  => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit))
  });

  useObserver(lastElement, isPostLoading, page < totalPages, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPost(page, limit);
  },[page, limit]);

  const createPost = newPost => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = post => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton
        style={{marginTop: '20px'}}
        onClick={() => setModal(true)}
      >
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue='Количество элементов на странице'
        options={[
        { value: 5, name: '5', },
        { value: 10, name: '10', },
        { value: 25, name: '25', },
        { value: -1, name: 'Показать все', },
      ]}
      />
      {
        postError &&
        <h1 style={{textAlign: 'center'}}>Произошла ошибка {postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов'/>
      <div ref={lastElement}/>
      {
        isPostLoading
          && <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '50px'
            }}
          >
            <Loader/>
          </div>
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;
