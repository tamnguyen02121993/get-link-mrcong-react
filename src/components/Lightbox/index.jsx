import React, { useEffect } from 'react';
import { createPortal } from "react-dom";
import { X } from "react-feather";

function Lightbox({ src, onClose }) {

    function handleClose() {
        if (onClose) {
            onClose();
        }
    }

    useEffect(() => {
        function handleCloseLightbox(e) {
            // keyCode 27 is Escape
            if (e.keyCode === 27) {
                if (onClose) {
                    onClose();
                }
            }
        }
        window.addEventListener('keyup', handleCloseLightbox);
        return () => {
            window.removeEventListener('keyup', handleCloseLightbox);
        }
    }, []);
    return createPortal((
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-black/75 z-50 hidden xl:block' onClick={handleClose}>
            <div className='absolute top-2 right-2 w-10 h-10 text-white cursor-pointer' onClick={handleClose}>
                <X size={40} />
            </div>
            <div className='absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <img className='min-w-[500px] md:min-w-[600px] lg:min-w-[900px] xl:min-w-[1000px] h-auto' src={src} />
            </div>
        </div>
    ), document.querySelector('body'));
}

export default Lightbox;