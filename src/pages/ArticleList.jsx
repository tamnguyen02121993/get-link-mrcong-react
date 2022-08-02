import { useSelector } from "react-redux"
import { ListData } from "../components";
import { pageItemsSelector, pageSelector, selectedCategorySelector } from "../store/slices/mrcongSlice"

function ArticleList() {
    const page = useSelector(pageSelector);
    const selectedCategory = useSelector(selectedCategorySelector);
    const data = useSelector(pageItemsSelector(selectedCategory?.category, page));
    return <ListData data={data}/>
}

export default ArticleList