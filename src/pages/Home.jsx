import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Category, PageControl, ErrorConnection } from "../components";
import {
  categoriesSelector,
  fetchCategories,
  pageItemsSelector,
  pageSelector,
  fetchPage,
  errorConnectionSelector,
  setPage,
  selectedCategorySelector,
  setSelectedCategory,
} from "../store/slices/mrcongSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category, page: pageParam } = useParams();
  const categories = useSelector(categoriesSelector);
  const page = useSelector(pageSelector);
  const selectedCategory = useSelector(selectedCategorySelector);
  const data = useSelector(pageItemsSelector(selectedCategory?.category, page));
  const errorConnection = useSelector(errorConnectionSelector);

  function handleSelectCategory(cat) {
    debugger;
    dispatch(setSelectedCategory(cat));
    dispatch(setPage(1));
    navigate(`/${cat.category}/${1}`);
  }

  function onNextPage() {
    dispatch(setPage(page + 1));
    navigate(`/${selectedCategory?.category}/${page + 1}`);
  }

  function onPreviousPage() {
    dispatch(setPage(page - 1));
    navigate(`/${selectedCategory?.category}/${page - 1}`);
  }

  useEffect(() => {
    function fetchData() {
      if (categories.length === 0) {
        dispatch(fetchCategories());
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (categories.length !== 0) {
      const findedCategory = categories.find((x) => x.category === category);
      if (findedCategory) {
        dispatch(setSelectedCategory(findedCategory));
        dispatch(setPage(Number.isNaN(Number(pageParam)) ? 1 : Number(pageParam)));
      }
    }
  }, [categories]);

  useEffect(() => {
    async function fetchPageData() {
      if (selectedCategory && data.length === 0) {
        dispatch(
          fetchPage({
            name: selectedCategory.category,
            page,
          })
        );
      }
    }
    fetchPageData();
  }, [selectedCategory, page]);

  return (
    <>
      {errorConnection ? (
        <ErrorConnection />
      ) : (
        <>
          <Category
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
          {selectedCategory && (
            <PageControl
              page={page}
              onNextPage={onNextPage}
              onPreviousPage={onPreviousPage}
            />
          )}
          <Outlet />
        </>
      )}
    </>
  );
}

export default Home;
