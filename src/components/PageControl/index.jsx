import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp } from "react-feather";

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

    function scrollTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className='fixed bottom-0 left-0 w-full h-16 bg-primary text-white z-50 flex items-center px-4 shadow-md xl:bottom-5 xl:right-24 xl:w-56 xl:left-[unset]'>
            <span className='hidden pr-4 text-3xl font-thin'>Page</span>
            <span className="px-2 xl:basis-1/3 basis-1/4 cursor-pointer hover:text-white/70 transition duration-300 hover:ease-out" onClick={handlePreviousPage}><ChevronLeft size={52} className="mx-auto" /></span>
            <span className='text-3xl px-2 xl:basis-1/3 basis-1/4 text-center'>{page}</span>
            <span className="px-2 xl:basis-1/3 basis-1/4 cursor-pointer hover:text-white/70 transition duration-300 hover:ease-out" onClick={handleNextPage}><ChevronRight size={52} className="mx-auto" /></span>
            <span className="xl:hidden px-2 basis-1/4 cursor-pointer hover:text-white/70 transition duration-300 hover:ease-out" onClick={scrollTop}><ChevronUp size={52} className="mx-auto" /></span>
        </div>
    );
}

export default PageControl;