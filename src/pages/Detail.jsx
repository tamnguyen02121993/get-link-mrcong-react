import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import { itemSelector, fetchDetail } from "../store/slices/mrcongSlice"

function Detail() {
    const dispatch = useDispatch();
    const { category, page } = useParams();
    const [searchParams] = useSearchParams();
    const item = useSelector(itemSelector(category, Number(page), searchParams.get('link')));

    useEffect(() => {
        async function fetchDetailData() {
            if (!item || !item?.imageList || !item?.info) {
                await dispatch(fetchDetail({
                    link: searchParams.get('link'),
                    category: category,
                    page: Number(page),
                }))
            }
        }
        fetchDetailData()
    }, [category, page, searchParams])

    return (
        <div className='px-4 lg:my-6 my-4'>
            <div className="flex flex-col justify-start">
                {
                    item?.info && item.info.map(x => (
                        <span key={x} className="text-2xl leading-10">{x}</span>
                    ))
                }
                {
                    item?.downloadLink && (<><span className="text-2xl leading-10">Download Link: <a className='hover:text-primary transition duration-300 hover:ease-out break-words' href={item.downloadLink} target="_blank">{item.downloadLink}</a></span>
                        <span className="text-2xl leading-10">Mật Khẩu Giải Nén: <span className='hover:text-primary transition duration-300 hover:ease-out'> mrcong.com</span></span></>
                    )
                }
            </div>
            <div className='flex flex-col'>
                {
                    item?.imageList && item.imageList.map(x => (<img className='mt-4' key={x} src={x} />))
                }
            </div>
        </div>
    );
}

export default Detail;