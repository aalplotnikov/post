import React from 'react';
import {usePagesArray} from '../../../hooks/usePagesAray';

const Pagination = ({totalPages, page, changePage}) => {
  const pagesArray = usePagesArray(totalPages);
  return (
    <div className='page__wrapper'>
      {
        pagesArray.map((p) =>
          <span
            onClick={() => changePage(p)}
            key={p}
            className={page === p ? 'page page__current' : 'page'}
          >
              {p}
            </span>)
      }
    </div>
  );
};

export default Pagination;