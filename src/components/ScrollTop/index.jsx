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
        <div className={clsx(['fixed bottom-5 right-5 w-14 h-14 hidden bg-white text-primary border border-primary border-solid justify-center items-center rounded-full cursor-pointer lg:hover:bg-primary lg:hover:text-white lg:hover:border-white transition duration-300 lg:hover:ease-in', { 'lg:flex': isShow }])} onClick={scrollTop}>
            <ChevronUp size={48} />
        </div>,
        document.querySelector("body")
    );
}

export default ScrolTop;
