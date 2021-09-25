import React from 'react'
import ReactPaginate from 'react-paginate'

export default function PaginationComponent(props) {
    return (
        <div className="paginationBttns"> 
            <p className="paginationRow">{props.pageVisited+1 + " - "}{props.pageVisited+props.perPage}</p>           
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={props.pageCount}
                onPageChange={props.changePage}
                containerClassName={"paginationBttnsContainer"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />                 
        </div>  
    )
}
