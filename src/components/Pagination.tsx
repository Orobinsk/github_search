import React, {FC, useEffect, useState} from 'react';

interface paginationProps{
    currentPage:number,
    setCurrentPage:(value: number) => void;
    total_count:number;
    setLoadingData:(value: boolean) => void
}

const Pagination:FC<paginationProps> = ({currentPage,setCurrentPage,total_count, setLoadingData}) => {
    const[totalPage,setTotalPage]=useState(1)

    useEffect(()=>{
        setTotalPage(Math.ceil(total_count/30))
    },[total_count])

    function handlePageChange(newPage: number) {
        if (newPage >= 1 && newPage <= totalPage) {
            setCurrentPage(newPage);
            setLoadingData(true)
        }
    }

    return (
        <div>
            <h3>Page {currentPage} of {totalPage}</h3>
            <button onClick={() => handlePageChange(currentPage - 1)}>Previous Page</button>
            <button onClick={() => handlePageChange(currentPage + 1)}>Next Page</button>
        </div>
    );
};

export default Pagination;
