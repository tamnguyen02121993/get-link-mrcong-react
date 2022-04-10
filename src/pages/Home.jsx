import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Category, ListData, PageControl, Loading, ErrorConnection } from "../components";
import { categoriesSelector, fetchCategories, pageItemsSelector, fetchPage, isLoadingSelector, errorConnectionSelector } from "../store/slices/mrcongSlice"

function Home() {
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
        <>
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
        </>
    );
}

export default Home;