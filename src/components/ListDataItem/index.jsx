import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbox } from "../"

function ListDataItem({ item }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenLightbox() {
        setIsOpen(true)
    }
    async function handleViewDetail() {
        navigate(`/${item.category}/${item.page}/detail?link=${item.href}`)
    }


    return (
        <>
            <div className="flex lg:my-8 my-4 flex-col xl:flex-row">
                <div className="flex-shrink-0">
                    <img className='shadow mx-auto w-full rounded-md cursor-pointer' src={item.coverImage} alt={item.title} onClick={handleViewDetail} />
                </div>
                <div className="flex-1 p-4">
                    <div className='mx-auto'>
                        <h3 className="text-2xl font-medium">Page Link</h3>
                        <p className='mt-4 pl-2'>{item.href}</p>
                    </div>
                    <button className='shadow-md mt-4 px-4 py-2 w-fit transition duration-300 hover:ease-in hover:bg-primary/80 bg-primary text-white rounded inline-block' onClick={handleViewDetail}>View Detail</button>
                </div>
            </div>
            {
                isOpen &&
                <Lightbox
                    src={item.coverImage}
                    onClose={() => setIsOpen(false)}
                />
            }
        </>
    );
}

export default ListDataItem;