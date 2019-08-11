import React, { Component } from 'react'
import ColumnReOrdering from "./ColumnReOrdering"
import './table.css'
import PopOver from './PopOver';
export default class TableLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        }
    }
    componentDidMount() {
        const { tableResponse } = this.props;
        this.setState({ tableData: tableResponse })
    }
    componentDidUpdate(prevProps) {
        const { tableResponse } = this.props;
        if (prevProps.tableResponse !== tableResponse) {
            this.setState({ tableData: tableResponse })
        }

    }
    render() {
        const { tableData } = this.state
        const { onColumnLayoutChange } = this.props
        console.log("tableData", tableData)
        return (
            <div>
                {
                    tableData && <div style={{ marginTop: "100px" }} className='table-layout'>
                        TableLayout
                         <table
                            className="react-components--table---styles--striped react-components--table---styles--base"
                            id="tableSuffle"
                        >
                            <thead className="griddle-table-heading">
                                <tr key="selectAll">
                                    {tableData.columnHeading && tableData.columnHeading.map((m, i) => {
                                        return (
                                            <th key={i} className="griddle-table-heading-cell" >
                                                {m.field}
                                                <PopOver field={m.field} ApplyBtnEvt={this.props.ApplyBtnEvt} />
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.rowData && tableData.rowData.map((data, idx) => {
                                    return <tr key={idx}>
                                        {tableData.columnHeading.map((item, idx) => {
                                            return <td key={idx}>{data[item.field]}</td>

                                        })}
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                }


                TableLayout

                  {/* Sending Column Data to modified Column Positions  */}
                {tableData &&
                    <ColumnReOrdering
                        columnHeading={tableData.columnHeading}
                        onColumnLayoutChange={onColumnLayoutChange} />}
            </div>
        )
    }
}


