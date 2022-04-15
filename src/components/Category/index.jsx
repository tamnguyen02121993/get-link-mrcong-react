import clsx from 'clsx';
import React from 'react';


export default function Category({ categories, onSelectCategory, selectedCategory }) {
    return (
        <div className='flex flex-wrap px-4 mt-4'>
            {
                categories && categories.map((cat) => (
                    <div className={clsx(['shadow m-2 px-4 py-3 transition duration-300 hover:ease-in hover:bg-primary hover:text-white cursor-pointer border border-solid rounded-lg', { 'bg-primary text-white': selectedCategory?.category === cat.category }])} key={cat.category} onClick={() => onSelectCategory(cat)}>{cat.name}</div>
                ))
            }
        </div>
    );
};