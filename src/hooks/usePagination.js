import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const usePagination = (page, maxPage, listRef) => {
  const navigate = useNavigate();

  const handlePageIncrease = useCallback(() => {
    if (page === maxPage) return;

    listRef.current.scrollIntoView();
    navigate(`/movies?page=${+page + 1}`);
  }, [page, maxPage, navigate, listRef]);

  const handlePageDecrease = useCallback(() => {
    if (page === 1) return;

    listRef.current.scrollIntoView();
    navigate(`/movies?page=${+page - 1}`);
  }, [page, navigate, listRef]);

  const handleLastPageClick = useCallback(() => {
    if (page === maxPage) return;

    listRef.current.scrollIntoView();
    navigate(`/movies?page=${maxPage}`);
  }, [listRef, maxPage, navigate, page]);

  const handleFirstPageClick = useCallback(() => {
    if (page === 1) return;

    listRef.current.scrollIntoView();
    navigate(`/movies?page=${1}`);
  }, [listRef, navigate, page]);

  return {
    handlePageIncrease,
    handlePageDecrease,
    handleLastPageClick,
    handleFirstPageClick,
  };
};

export default usePagination;
