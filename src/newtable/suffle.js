import React, { Component } from 'react'
import table from '../__mock__data/table'
import TableLayout from "./TableLayout"

export default class TableShuffle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableResponse: [],
            tableColumnLocalStorage: 'symptomCatagory'
        }
    }
    componentDidMount() {
        const { tableColumnLocalStorage, tableResponse } = this.state;
        this.setState({ tableResponse: table })
        if (localStorage.getItem(tableColumnLocalStorage) !== null) {
            const localStorageColumns = Object.assign([], JSON.parse(localStorage.getItem(tableColumnLocalStorage)))
            this.setState({ tableResponse: { ...tableResponse, columnHeading: localStorageColumns, rowData: table.rowData } })
        }
    }
    // componentDidUpdate(prevState) {
    //     const { tableResponse } = this.state;
    //     if (prevState.tableResponse !== tableResponse) {
    //         this.setState({ tableResponse: table })
    //     }

    // }
    //ColumnChangeEvent
    //will receive format from ColumnReOrdering component
    onColumnLayoutChange = (ColumnReOrderingHeading) => {
        const { tableColumnLocalStorage, tableResponse } = this.state;
        console.log("Working onColumnLayoutChange", ColumnReOrderingHeading)
        this.setState({ tableResponse: { ...tableResponse, columnHeading: ColumnReOrderingHeading, rowData: table.rowData } })
        localStorage.setItem(tableColumnLocalStorage, JSON.stringify(ColumnReOrderingHeading))

    }
    ApplyBtnEvt = (InputValue, field) => {
        console.log("lok", InputValue, field)
    }
    render() {
        const { tableResponse } = this.state
        console.log("tableResponse", tableResponse)
        return (
            <div>
                TableShuffle{
                    tableResponse &&
                    <TableLayout
                        tableResponse={tableResponse}
                        onColumnLayoutChange={this.onColumnLayoutChange}
                        ApplyBtnEvt={this.ApplyBtnEvt} />
                }

            </div>
        )
    }
}
