import React, { Component } from 'react'
import TableLayout from './TableLayout/TableLayout';
import { globalColumnFilter } from "./FilterLogic/FilterLogic"
import table from "../__mock__data/table.json"
import GlobalSearch from './GlobalSearch/GlobalSearch';
import FilteredView from './FilteredView/FilteredView';
export default class TableShuffle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableResponse: [],
            filterCollection: {
                globalSearchText: '',
                columnNames: []
            }
        }
    }

    componentDidMount() {
        let newTable = table && table.rowData && table.rowData.map(item => {
            let innerConstructedObj = {};
            item.data.map(innerData => {
                return innerConstructedObj[innerData.id] = innerData.value;
            })
            return innerConstructedObj;
        })
        table.rowData = newTable;
        this.setState({ tableResponse: table })

    }

    handleUniqueColFilter = (responseObject, colheading) => {
        const newObject = Object.assign([], responseObject);
        const ObjectIndex = newObject.findIndex(m => m.columnNames === colheading);
        if (ObjectIndex >= 0)
            newObject.splice(ObjectIndex, 0)

        return newObject
    }

    ApplyBtnEvt = (InputValue, field, exact, displayName) => {

        const { filterCollection, tableResponse } = this.state;
        const collectionFilterValues = this.handleUniqueColFilter(filterCollection.columnNames, field)
        const combinationObject = Object.assign({}, filterCollection)
        const ObjectFilter = {
            displayName,
            exact,
            columnName: field,
            searchValue: InputValue
        }
        collectionFilterValues.push(ObjectFilter);
        combinationObject.columnNames = collectionFilterValues
        const modifiedObject = globalColumnFilter(table, combinationObject)

        this.setState({
            filterCollection: combinationObject,
            tableResponse: {
                ...tableResponse,
                rowData: modifiedObject.rowData
            }
        })
    }

    /**
     * Clear Filter Logics Start
    */
    clearAllFilter = () => {
        const { tableResponse } = this.state;
        const filterCollectionEmpty = {
            globalSearchText: '',
            columnNames: []
        }
        if (Object.keys(table).length) {
            const modifiedObject = globalColumnFilter(table, filterCollectionEmpty)
            this.setState({
                filterCollection: filterCollectionEmpty,
                tableResponse: {
                    ...tableResponse,
                    rowData: modifiedObject.rowData
                }
            })
        }
    }

    clearglobalSearch = () => {
        const { filterCollection, tableResponse } = this.state;
        const combinationObject = Object.assign({}, filterCollection)
        combinationObject.globalSearchText = ''
        //TODO : Can refactor 
        if (Object.keys(table).length) {
            const modifiedObject = globalColumnFilter(table, combinationObject)
            this.setState({
                filterCollection: combinationObject,
                tableResponse: {
                    ...tableResponse,
                    rowData: modifiedObject.rowData
                }
            })
        }
    }

    clearfilterSearch = field => {
        const { filterCollection, tableResponse } = this.state;
        const combinationObject = Object.assign({}, filterCollection)

        if (combinationObject && combinationObject.columnNames && combinationObject.columnNames.length) {
            const index = combinationObject.columnNames.findIndex(ele => ele.columnName === field);
            if (index !== -1) {
                combinationObject.columnNames.splice(index, 1);
            }
        }
        //TODO : Can refactor 
        if (Object.keys(table).length) {
            const modifiedObject = globalColumnFilter(table, combinationObject)
            this.setState({
                filterCollection: combinationObject,
                tableResponse: {
                    ...tableResponse,
                    rowData: modifiedObject.rowData
                }
            })
        }
    }
    /**
     * Clear Filter Logics End
    */


    //Global Handle Event
    handleglobalFxn = value => {
        const { filterCollection, tableResponse } = this.state;
        const combinationObject = Object.assign({}, filterCollection)
        combinationObject.globalSearchText = value;
        //TODO : Can refactor 
        if (Object.keys(table).length) {
            const modifiedObject = globalColumnFilter(table, combinationObject)
            this.setState({
                filterCollection: combinationObject,
                tableResponse: {
                    ...tableResponse,
                    rowData: modifiedObject.rowData
                }
            })
        }
    }



    render() {
        const { filterCollection, tableResponse } = this.state;

        return (
            <div>
                <GlobalSearch onEnterEvnt={this.handleglobalFxn}
                    placeholder='Search' />
                <FilteredView
                    filterCollection={filterCollection}
                    clearAllFilter={this.clearAllFilter}
                    clearfilterSearch={this.clearfilterSearch}
                    clearglobalSearch={this.clearglobalSearch}
                />
                <TableLayout
                    filterCollection={filterCollection}
                    tableResponse={tableResponse}
                    ApplyBtnEvt={this.ApplyBtnEvt}
                />
            </div>
        )
    }
}
