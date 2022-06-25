import React from 'react';
import { getPagesArray } from '../../utils/pages';

export default function Pagination({ totalPages, page, changePage }) {
  let pagesArray = getPagesArray(totalPages);
  return (
    <div className="pagination">
      {pagesArray.map((p) => {
        return (
          <span
            onClick={() => changePage(p)}
            className={page === p ? 'page page__current' : 'page'}
            key={p}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
}
