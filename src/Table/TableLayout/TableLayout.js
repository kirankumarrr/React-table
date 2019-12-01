import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import TableHeading from '../Table-SubComponent/TableHeading'
import TableRow from '../Table-SubComponent/TableRow'
import { sorting } from '../Sorting/Sorting'

const TableLayout = ({ filterCollection, tableResponse, ApplyBtnEvt }) => {
    const [rowData, setrowData] = useState([])
    const [columnData, setcolumnData] = useState([])

    useEffect(() => {
        if (tableResponse
            && tableResponse.columnHeaders
            && tableResponse.columnHeaders.length
            && tableResponse.rowData
            && tableResponse.rowData.length) {
            setrowData(tableResponse.rowData)
            setcolumnData(tableResponse.columnHeaders)
        }
        return () => {
            setrowData([])
            setcolumnData([])
        };
    }, [tableResponse])

    const handleColumnSorting = (key, sortKey) => setrowData(Object.assign([], sorting(rowData, key, sortKey)))



    return (
        <div>
            {
                <div className='table-Layout'>
                    <table
                        className='tableContainer table table-stripped'
                        id='tableSuffle'
                    >
                        <thead className='griddle-table-heading'>
                            <tr>
                                <TableHeading
                                    handleColumnSorting={handleColumnSorting}
                                    filterCollection={filterCollection}
                                    ApplyBtnEvt={ApplyBtnEvt}
                                    columnData={columnData}
                                />
                            </tr>
                        </thead>
                        <tbody>
                            <TableRow
                                rowData={rowData}
                                columnData={columnData}
                            />
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

TableLayout.propTypes = {

}

export default TableLayout
