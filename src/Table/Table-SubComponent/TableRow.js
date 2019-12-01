import React from 'react'
import PropTypes from 'prop-types'

const TableRow = ({ rowData, columnData }) => {
    return rowData && rowData.map((data, idx) => {
        return <tr key={idx}>
            {
                columnData && columnData.map((item, index) => {
                    return <td key={index}>{data[item.id]}</td>
                })
            }
        </tr>
    })
}

TableRow.propTypes = {

}

export default TableRow
