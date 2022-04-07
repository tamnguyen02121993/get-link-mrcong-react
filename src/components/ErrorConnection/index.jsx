import React from 'react';
import internalError from "../../assets/images/500.png"

function ErrorConnection() {
    function handleReloadPage() {
        location.reload();
    }
    return (
        <>
            <div className='flex flex-col'>
                <img className='mx-auto' src={internalError} alt="Internal Error" />
                <button className='px-4 py-2 mx-auto w-fit mt-4 bg-primary text-white border border-solid rounded-lg hover:bg-primary/80 transition duration-300 hover:ease-out' onClick={handleReloadPage}>Reload Page</button>

            </div>
        </>
    );
}

export default ErrorConnection;