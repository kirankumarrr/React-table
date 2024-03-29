import React from 'react'

const PageNeighbours = ({ paginationNumber, currentPage, pgEnd, paginateCurrentData }) => {
    //handle pageNehbhiours
    let pgMdlSec = [];
    const pgStart = 1
    if (paginationNumber.length > 5) {
        if (currentPage === 1) {
            pgMdlSec = [currentPage, currentPage + 1, currentPage + 2, true, pgEnd]
        }
        else if (currentPage === 2) {
            pgMdlSec = [pgStart, currentPage, currentPage + 1, true, pgEnd]
        }
        else if (currentPage > 2 && (currentPage < pgEnd - 2)) {
            pgMdlSec = [pgStart, true, currentPage - 1, currentPage, currentPage + 1, true, pgEnd]
        }
        else {
            if (pgEnd - 2 === currentPage) {
                pgMdlSec = [pgStart, true, currentPage - 1, currentPage, currentPage + 1, pgEnd]
            }
            else if (pgEnd - 1 === currentPage) {
                pgMdlSec = [pgStart, true, currentPage - 1, currentPage, currentPage + 1]
            }
            else {
                pgMdlSec = [pgStart, true, currentPage - 2, currentPage - 1, currentPage]
            }
        }
    }
    return (
        <>
            {pgMdlSec.map((number, index) => {
                if (number === currentPage) {
                    return (<span key={index} style={{ width: '20px', padding: "10px", background: '#63f1d6', cursor: 'pointer', marginRight: '10px' }} onClick={() => paginateCurrentData(number)}>{number}</span>
                    )
                }
                else if (number === true) {
                    return (<span key={index} style={{ width: '20px', padding: "10px", marginRight: '10px' }} >---</span>
                    )
                }
                else {
                    return (<span key={index} style={{ width: '20px', padding: "10px", cursor: 'pointer', marginRight: '10px' }} onClick={() => paginateCurrentData(number)}>{number}</span>)
                }
            })}
        </>
    )
}


export default PageNeighbours
