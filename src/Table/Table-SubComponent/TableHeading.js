import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FilterPopUp from '../FilterPopUp/FilterPopUp'

const TableHeading = ({
    columnData,
    filterCollection,
    handleColumnSorting,
    ApplyBtnEvt
}) => {

    const [sortField, setsortField] = useState('')
    const [sort, setSort] = useState('')

    useEffect(() => {
        setsortField('');
        setSort('')
    }, [columnData])

    const FilterSection = (m) => {
        let filterColorEnable = false;
        filterColorEnable = filterCollection
            && filterCollection.columnNames
            && filterCollection.columnNames.some(ele => m.label.replace(/ +/g, '') === ele.displayName.replace(/ +/g, ''));
        return <FilterPopUp
            field={m.id}
            displayName={m.label}
            ApplyBtnEvt={ApplyBtnEvt}
            filterColorEnable={filterColorEnable}
        />
    }

    const handleSortMethod = (columnFieldsArgs, sortFieldArgs) => {
        setsortField(columnFieldsArgs);
        setSort(sortFieldArgs)
        handleColumnSorting(columnFieldsArgs, sortFieldArgs)
    }

    const handleSort = (e, columnField) => {
        if ((sortField === '') || (sortField === columnField && sort === 'desc')) {
            handleSortMethod(columnField, 'asce');
        } else if ((sortField === columnField && sort === 'asce')) {
            handleSortMethod(columnField, 'desc');
        }
        else {
            handleSortMethod(columnField, 'asce');
        }

    }

    return columnData && columnData.map((m, i) => {
        return (
            <th key={i}
                onClick={(e) => JSON.parse(m.sortable) ? handleSort(e, m.id) : () => { }}
                className='griddle-table-heading-cell'
            >{m.label}
                {sort === 'desc' && sortField === m.id ? (<span className='glyphicon glyphicon-arrow-up'></span>) : null}

                {sort === 'asce' && sortField === m.id ? (<span className='glyphicon glyphicon-arrow-down'></span>) : null}
                {JSON.parse(m.filterable) ? FilterSection(m) : null}
            </th>
        )
    })
}

TableHeading.propTypes = {

}

export default TableHeading
