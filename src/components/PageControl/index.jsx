import React from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";

function PageControl({ page, onNextPage, onPreviousPage }) {
    function handlePreviousPage() {
        if (page === 1) {
            return;
        }
        if (onPreviousPage) {
            onPreviousPage();
        }
    }

    function handleNextPage() {
        if (page === 50) {
            return;
        }
        if (onNextPage) {
            onNextPage();
        }
    }
    return (
        <div className='flex px-4 my-4 items-center'>
            <span className='pr-4 text-3xl font-thin'>Page</span>
            <span className="px-2 cursor-pointer hover:text-primary transition duration-300 hover:ease-out" onClick={handlePreviousPage}><ChevronLeft size={52} /></span>
            <span className='text-3xl px-2'>{page}</span>
            <span className="px-2 cursor-pointer hover:text-primary transition duration-300 hover:ease-out" onClick={handleNextPage}><ChevronRight size={52} /></span>
        </div>
    );
}

export default PageControl;