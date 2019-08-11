import React, { Component } from 'react'
import './column.css'
export default class ColumnReOrdering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ColumnReOrderingHeading: []
        }
    }
    componentDidMount() {
        const { columnHeading } = this.props;
        const ColumnReOrderingHeadingNew = Object.assign([], columnHeading)
        ColumnReOrderingHeadingNew.forEach((element, index) => {
            element.position = index;
        });
        this.setState({ ColumnReOrderingHeading: ColumnReOrderingHeadingNew })
    }
    componentDidUpdate(prevProps) {
        const { columnHeading } = this.props
        if (prevProps.columnHeading !== columnHeading) {
            const ColumnReOrderingHeadingNew = Object.assign([], columnHeading)
            ColumnReOrderingHeadingNew.forEach((element, index) => {
                element.position = index;
            });
            this.setState({ ColumnReOrderingHeading: ColumnReOrderingHeadingNew })
        }

    }
    //Updating column Data into Local State to handle positions and checkboxes
    //handle order up position of column
    handleOrderingUp = pos => {
        const { ColumnReOrderingHeading } = this.state;
        const OrderUpColumnHeading = Object.assign([], ColumnReOrderingHeading)
        const Index = OrderUpColumnHeading.findIndex(o => o.field === pos);
        if (Index > 0 && Index < OrderUpColumnHeading.length) {
            OrderUpColumnHeading[Index].position = OrderUpColumnHeading[Index].position - 1
            OrderUpColumnHeading[Index - 1].position = OrderUpColumnHeading[Index].position + 1
            OrderUpColumnHeading.sort((a, b) => parseFloat(a["position"]) - parseFloat(b["position"]))
            this.setState({ ColumnReOrderingHeading: OrderUpColumnHeading })
        }

    };


    handleOrderingDown = pos => {
        const { ColumnReOrderingHeading } = this.state;
        const OrderUpColumnHeading = Object.assign([], ColumnReOrderingHeading)
        const Index = OrderUpColumnHeading.findIndex(o => o.field === pos);
        if (Index >= 0 && Index < OrderUpColumnHeading.length - 1
        ) {
            OrderUpColumnHeading[Index].position = OrderUpColumnHeading[Index].position + 1;
            OrderUpColumnHeading[Index + 1].position = OrderUpColumnHeading[Index].position - 1;
            OrderUpColumnHeading.sort((a, b) => parseFloat(a["position"]) - parseFloat(b["position"]))
            this.setState({ ColumnReOrderingHeading: OrderUpColumnHeading })
        }

    };

    //checboxes
    handleClickCheckBox = (event, field) => {
        const { ColumnReOrderingHeading } = this.state
        const checkBoxData = Object.assign([], ColumnReOrderingHeading)
        if (event.target.checked === true) {
            checkBoxData.forEach((element) => {
                if (element.field === field) {
                    element.defautDisplay = true
                }
            })
        }
        else {
            checkBoxData.forEach((element) => {
                if (element.field === field) {
                    element.defautDisplay = false
                }
            })
        }
        this.setState({ ColumnReOrderingHeading: checkBoxData })

    }
    sendColumnData =()=>{
        const { onColumnLayoutChange } = this.props
        const { ColumnReOrderingHeading } = this.state
        onColumnLayoutChange(ColumnReOrderingHeading)
    }
    modalPopUpFxn() {
        const { ColumnReOrderingHeading } = this.state
    
        //it need column data
        return (
            <div >
                <div className="Table--Edit--Column--popup">
                    <div className="Table--Edit--Column--heading">Edit Columns</div>
                    <p className="Table--Edit--Column--para">
                        The change you make will be persistent and only seen by you. When
                        check and click ok coluns will be visible otherwise it will hidden
              </p>
                    <div className="Table--Edit--SelectAll">
                        <input
                            // onClick={this.handleClick}
                            type="checkbox"
                            name="selectAll"
                            value="Enter name"
                            id="SelectAll"
                        />
                        <p className="Table--Edit--SelectAll-text">
                            SELECT / DESELECT ALL
                </p>
                    </div>
                    {ColumnReOrderingHeading.map((m, i) => {
                        return (
                            <div className="Table--Edit--SelectAll" key={i}>
                                <div className="Table-Input-Layer">
                                    <input
                                        onChange={e => this.handleClickCheckBox(e, m.field)}
                                        type="checkbox"
                                        name={m.field}
                                        value={m.field}
                                        id={m.field}
                                        checked={m.defautDisplay}
                                    />
                                    <p className="Table--Edit--SelectAll-text">{m.field}</p>
                                </div>
                                <div className="Table-Col-Action">
                                    <span
                                        className="table-action-callup"
                                        onClick={e => this.handleOrderingUp(m.field)}
                                    >
                                        <span className="table-action-call">Move up</span>
                                        <span className="glyphicon glyphicon-align-left" aria-hidden="true"></span>

                                    </span>
                                    <span
                                        className="table-action-calldown"
                                        onClick={e => this.handleOrderingDown(m.field)}
                                    >
                                        <span className="table-action-call">Move down</span>

                                        <span className="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.sendColumnData}> Click Me</button>
                </div>
            </div>
        )
    }
    render() {
        const { ColumnReOrderingHeading } = this.state
        console.log(ColumnReOrderingHeading, 'ColumnReOrderingData')
        return (
            <div>
                ColumnReOrdering
               {this.modalPopUpFxn()}
            </div>
        )
    }
}
