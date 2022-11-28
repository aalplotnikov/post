import {useMemo} from 'react';

export const usePagesArray = (totalPages) => {
  const pagesArray = useMemo(() => {
    const pagesArray = [];
    for (let i = 0; i < totalPages; i++) {
      pagesArray.push(i + 1);
    }
    return pagesArray;
  }, [totalPages]);
  return pagesArray;
};
