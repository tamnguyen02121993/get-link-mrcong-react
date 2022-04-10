import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Category, ListData, PageControl, ErrorConnection } from "../components";
import { categoriesSelector, fetchCategories, pageItemsSelector, pageSelector, fetchPage, errorConnectionSelector, setPage, selectedCategorySelector, setSelectedCategory } from "../store/slices/mrcongSlice"

function Home() {
    const dispatch = useDispatch();
    const categories = useSelector(categoriesSelector);
    const page = useSelector(pageSelector);
    const selectedCategory = useSelector(selectedCategorySelector);
    const data = useSelector(pageItemsSelector(selectedCategory?.name, page));
    const errorConnection = useSelector(errorConnectionSelector);

    async function handleSelectCategory(cat) {
        dispatch(setSelectedCategory(cat));
        dispatch(setPage(1));
    }

    useEffect(() => {
        async function fetchData() {
            if (categories.length === 0) {
                await dispatch(fetchCategories())
            }
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
        <>
            {
                errorConnection ? (<ErrorConnection />) : (
                    <>
                        <Category categories={categories} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
                        {selectedCategory && <PageControl page={page} onNextPage={() => dispatch(setPage(page + 1))} onPreviousPage={() => dispatch(setPage(page - 1))} />}
                        <ListData data={data} />
                    </>
                )
            }
        </>
    );
}

export default Home;