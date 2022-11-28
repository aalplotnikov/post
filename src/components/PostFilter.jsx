import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
      <MyInput
        placeholder='Поиск...'
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
      />
      <MySelect
        value={filter.sort}
        onChange={selectSorted => setFilter({...filter, sort: selectSorted})}
        defaultValue='Сортировка'
        options={[
          {value: 'title', name: 'по названию'},
          {value: 'body', name: 'по описанию'},
        ]}
      />
    </div>
  );
};

export default PostFilter;