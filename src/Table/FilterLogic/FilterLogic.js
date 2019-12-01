
/*
 * Column Fitering Funciton
 */
// TODO: Can Refactor

export const columnSearch = (data, colheading, searchValue, exact) => {
    const columnSearchResult = Object.assign({}, data);
    if (colheading.length !== null && exact !== true) {
        if (columnSearchResult && columnSearchResult.rowData && columnSearchResult.rowData.length > 0) {
            columnSearchResult.rowData = data
                && data.rowData
                && data.rowData.filter(row => {
                    if (row[colheading]
                        && row[colheading] !== undefined
                        && typeof row[colheading] !== 'undefined'
                    ) {
                        return row[colheading]
                            .toString()
                            .toLowerCase()
                            .includes(searchValue.trim().toLowerCase());
                    }
                    return false;
                });
        }
    }
    // Below condition is When exact is true
    if (colheading.length !== null && exact === true) {
        columnSearchResult.rowData = data.rowData.filter(row => {
            if (row[colheading] !== undefined
                && typeof row[colheading] !== 'undefined'
            ) {
                return row[colheading].toString().toLowerCase() === searchValue.trim().toLowerCase();
            }
            return false;
        });
    }
    return columnSearchResult;
};
/**
 * Global Fitering Funciton
 */
export const globalSearch = (globalSearchValue, allData) => {
    let totalTableData = {};
    let resultGlobalData = {};
    if (allData && allData.columnHeaders) {
        allData.columnHeaders.map(data => {

            resultGlobalData = columnSearch(allData, data.id, globalSearchValue, false);

            if (totalTableData.rowData === undefined && resultGlobalData.rowData && resultGlobalData.rowData.length > 0) {
                totalTableData = Object.assign({}, resultGlobalData);
                resultGlobalData = {};
            } else if (totalTableData.rowData !== undefined && resultGlobalData.rowData.length > 0) {
                let uniqData = Object.assign([], resultGlobalData.rowData);
                totalTableData.rowData.map(rowData => {
                    uniqData = uniqData.filter(headingRow => rowData.id !== headingRow.id);
                    return null;
                });
                uniqData.forEach(value => totalTableData.rowData.push(value));
                resultGlobalData = {};
            }
            return null;
        });
    }
    return totalTableData;
};
export const globalColumnFilter = (tableOriginalData, filteredObject) => {
    let modTableData = Object.assign({}, tableOriginalData);

    modTableData.columnHeaders = Object.assign([], modTableData.columnHeaders);
    if (filteredObject.globalSearchText !== undefined && filteredObject.globalSearchText !== '') {
        modTableData = globalSearch(filteredObject.globalSearchText, modTableData);
        if (Object.keys(modTableData).length === 0) {
            modTableData.rowData = [];
            modTableData.columnHeaders = tableOriginalData.columnHeaders;
        }
    }
    if (filteredObject && filteredObject.columnNames && filteredObject.columnNames.length > 0) {
        filteredObject.columnNames.map(columns => {
            return modTableData = columnSearch(modTableData, columns.columnName, columns.searchValue, columns.exact);
        });
    }
    return modTableData;
};
