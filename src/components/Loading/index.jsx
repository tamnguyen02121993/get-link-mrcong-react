import React from 'react';
import { createPortal } from "react-dom";
import ReactLoading from 'react-loading';

function Loading(props) {
    return createPortal((
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-black/75 z-50 flex justify-center items-center'>
            <div className="text-white">
                <ReactLoading type="bars" />
            </div>
        </div>
    ), document.querySelector('body'));
}

export default Loading;