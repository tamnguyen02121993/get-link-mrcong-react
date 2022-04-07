import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Lightbox } from "../"
import { fetchLink } from "../../store/slices/mrcongSlice"

function ListDataItem({ item }) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenLightbox() {
        setIsOpen(true)
    }
    async function handleGenerateLink(link) {
        await dispatch(fetchLink({
            link,
            category: item.category,
            page: item.page,
        }))
    }


    return (
        <>
            <div className="flex lg:my-8 my-4 flex-col xl:flex-row">
                <div className="flex-shrink-0 relative">
                    <img className='mx-auto w-full rounded-md cursor-pointer' src={item.image} alt={item.title} onClick={handleOpenLightbox} />
                    <div className="absolute transition duration-200 hover:ease-out bg-transparent hover:bg-black/20. z-10 w-full h-full top-0 left-0 cursor-pointer" onClick={handleOpenLightbox}>
                    </div>
                </div>
                <div className="flex-1 p-4">
                    <div className='mx-auto'>
                        <h3 className="text-2xl font-medium">Page Link</h3>
                        <p className='mt-4 pl-2'>{item.href}</p>
                    </div>
                    {
                        item.downloadLink ? (
                            <div className='mt-4'>
                                <h3 className="text-2xl font-medium">Download Link</h3>
                                <a className='mt-4 border border-dashed border-primary hover:bg-primary hover:text-white transition duration-300 hover:ease-in rounded p-2 flex items-center justify-between' href={item.downloadLink} target="_blank">{item.downloadLink}</a>
                            </div>
                        ) : (
                            <button className='mt-4 px-4 py-2 w-fit transition duration-300 hover:ease-in hover:bg-primary/80 bg-primary text-white rounded inline-block' onClick={() => handleGenerateLink(item.href)}>Generate link</button>
                        )
                    }
                </div>
            </div>
            {
                isOpen &&
                <Lightbox
                    src={item.image}
                    onClose={() => setIsOpen(false)}
                />
            }
        </>
    );
}

export default ListDataItem;