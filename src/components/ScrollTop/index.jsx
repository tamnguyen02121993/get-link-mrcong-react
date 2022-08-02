import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronUp } from "react-feather";

function ScrolTop() {

    const [isShow, setIsShow] = useState(false);

    function scrollTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        setIsShow(false);
    }

    useEffect(() => {
        function handleScroll(e) {
            if (window.scrollY > 500) {
                setIsShow(true);
            } else {
                setIsShow(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return createPortal(
        <div className={clsx(['shadow-md fixed bottom-5 right-5 w-10 h-10 hidden bg-white text-primary border border-primary border-solid justify-center items-center rounded-full cursor-pointer xl:hover:bg-primary xl:hover:text-white xl:hover:border-white transition duration-300 xl:hover:ease-in z-50', { 'xl:flex': isShow }])} onClick={scrollTop}>
            <ChevronUp size={48} />
        </div>,
        document.querySelector("body")
    );
}

export default ScrolTop;
