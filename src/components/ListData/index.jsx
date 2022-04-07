import React from 'react';
import { ListDataItem } from "../";

function ListData({ data }) {
    return (
        <div className='px-4 lg:my-6 my-4'>
            {
                data.map((x) => (
                    <ListDataItem key={x.title} item={x} />
                ))
            }
        </div>
    );
}

export default ListData;