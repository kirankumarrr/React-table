import React from 'react'

const Pagination = ({ postsPerPage, totalPost, paginateCurrentData, paginatePerData, currentPage, nextPage, prePage }) => {
    const paginationNumber = []
    for (let i = 1; i <= Math.ceil(totalPost / postsPerPage); i++) {
        paginationNumber.push(i);
    }
    const pagePerData = [1, 2, 3, 5, 10, 20]
    return (
        <div>
            <div>
                <h1>No of Records</h1>
                <span >{(currentPage - 1) * Math.ceil(totalPost / postsPerPage)}--{(currentPage) * Math.ceil(totalPost / postsPerPage)}**** {totalPost}</span>
                <h1>Pagination</h1>
                {
                    currentPage === 1 ? (<span className="glyphicon glyphicon-chevron-left" aria-hidden="true" style={{ color: 'red', cursor: 'not-allowed' }}></span>) : (<span className="glyphicon glyphicon-chevron-left" aria-hidden="true" onClick={() => prePage(currentPage)}  ></span>)
                }
                {
                    paginationNumber.map(number => {
                        return currentPage === number ?
                            (<span key={number} style={{ width: '20px', padding: "10px", background: 'green', cursor: 'pointer', marginRight: '10px' }} onClick={() => paginateCurrentData(number)}>{number}</span>
                            ) : (<span key={number} style={{ width: '20px', padding: "10px", cursor: 'pointer', marginRight: '10px' }} onClick={() => paginateCurrentData(number)}>{number}</span>)
                    })
                }
                {
                    currentPage === Math.ceil(totalPost / postsPerPage) ? (<span className="glyphicon glyphicon-chevron-right" aria-hidden="true" style={{ color: 'red', cursor: 'not-allowed' }}></span>) : (<span className="glyphicon glyphicon-chevron-right" aria-hidden="true" onClick={() => nextPage(currentPage)}></span>)
                }

            </div>
            <div>
                <h1>PageperData</h1>
                {
                    pagePerData.map(pgnum => {
                        return postsPerPage === pgnum ?
                            (<span key={pgnum} style={{ width: '20px', paddingRight: "10px", background: 'green', cursor: 'pointer', }} onClick={() => paginatePerData(pgnum)}>{pgnum}</span>) : (<span key={pgnum} style={{ width: '20px', paddingRight: "10px", cursor: 'pointer' }} onClick={() => paginatePerData(pgnum)}>{pgnum}</span>)
                    }

                    )
                }
            </div>
        </div >
    )
}

export default Pagination
