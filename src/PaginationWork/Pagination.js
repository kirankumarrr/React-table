import React from 'react'
import PageNeighbours from "./PageNeighbours/PageNeighbours"
import DefaultPagination from './PageNeighbours/DefaultPagination';
const Pagination = ({ indexOfLastPage, indexOfFirstPage, postsPerPage, totalPost, paginateCurrentData, paginatePerData, currentPage, nextPage, prePage }) => {
    const paginationNumber = []
    for (let i = 1; i <= Math.ceil(totalPost / postsPerPage); i++) {
        paginationNumber.push(i);
    }

    const pgEnd = Math.ceil(totalPost / postsPerPage)

    const pagePerData = [1, 2, 3, 5, 10, 20]
    return (
        <div>
            <div>
                <h1>No of Records</h1>
                <span >{indexOfFirstPage}--{indexOfLastPage}**** {totalPost}</span>
                <h1>Pagination</h1>

                {
                    currentPage === 1 ? (<span className="fa fa-angle-left" aria-hidden="true" style={{ color: 'red', cursor: 'not-allowed' }}></span>) : (<span className="fa fa-angle-left" aria-hidden="true" onClick={() => prePage(currentPage)} style={{ cursor: 'pointer' }}></span>)
                }
                {paginationNumber.length > 5 ? (
                    <PageNeighbours
                        paginationNumber={paginationNumber}
                        currentPage={currentPage}
                        pgEnd={pgEnd}
                        paginateCurrentData={paginateCurrentData} />)
                    : (<DefaultPagination
                        paginationNumber={paginationNumber}
                        currentPage={currentPage}
                        paginateCurrentData={paginateCurrentData} />)}
                {
                    currentPage === Math.ceil(totalPost / postsPerPage) ? (<span className="fa fa-angle-right" aria-hidden="true" style={{ color: 'red', cursor: 'not-allowed' }}></span>) : (<span style={{ cursor: 'pointer' }} className="fa fa-angle-right" aria-hidden="true" onClick={() => nextPage(currentPage)}></span>)
                }

            </div>
            <div>
                <h1>PageperData</h1>
                {
                    pagePerData.map(pgnum => {
                        return postsPerPage === pgnum ?
                            (<span key={pgnum} style={{ padding: '5px', background: '#91f591', cursor: 'pointer', }} onClick={() => paginatePerData(pgnum)}>{pgnum}</span>) : (<span key={pgnum} style={{ padding: '5px', cursor: 'pointer' }} onClick={() => paginatePerData(pgnum)}>{pgnum}</span>)
                    })
                }
            </div>
        </div >
    )
}

export default Pagination
