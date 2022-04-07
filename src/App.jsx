import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import { Category, ListData, ScrollTop, PageControl, Loading, ErrorConnection } from "./components/";
import { categoriesSelector, fetchCategories, pageItemsSelector, fetchPage, isLoadingSelector, errorConnectionSelector } from "./store/slices/mrcongSlice"

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const data = useSelector(pageItemsSelector(selectedCategory?.name, page));
  const isLoading = useSelector(isLoadingSelector);
  const errorConnection = useSelector(errorConnectionSelector);

  async function handleSelectCategory(cat) {
    setSelectedCategory(cat);
    setPage(1);
  }

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchCategories())
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchPageData() {
      if (selectedCategory && data.length === 0) {
        dispatch(fetchPage({
          name: selectedCategory.name,
          page
        }))
      }
    }
    fetchPageData();
  }, [selectedCategory, page])

  return (
    <div className="container mx-auto bg-white pt-16 pb-4 min-h-screen flex flex-col">
      <h1 className="text-center capitalize text-4xl py-4 px-8 mx-auto font-medium border border-primary border-dashed rounded-2xl inline-block text-primary">Tool get link from site MrCong</h1>
      {
        errorConnection ? (<ErrorConnection />) : (
          <>
            <Category categories={categories} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
            {selectedCategory && <PageControl page={page} onNextPage={() => setPage(oldPage => oldPage + 1)} onPreviousPage={() => setPage(oldPage => oldPage - 1)} />}
            <ListData data={data} />
            {
              isLoading && <Loading />
            }

          </>
        )
      }
      <h3 className="text-center capitalize text-2xl py-4 px-4 mx-auto mt-auto font-medium inline-block text-primary">&copy; Created By
        <a href={import.meta.env.VITE_APP_GITHUB} target="_blank" className="ml-2 bg-primary text-white px-2 py-1 rounded-lg border border-solid md:hover:bg-white md:hover:text-primary transition duration-300 md:hover:ease-out md:hover:border-primary">Tam Nguyen</a>
      </h3>
      <ScrollTop />
    </div>
  )
}

export default App
