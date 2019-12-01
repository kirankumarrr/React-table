import React, { Component } from 'react'
import "./popOver.css";
export default class PopOver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            excatBtn: false,
            activepopOver: ''

        }
    }
    handleOutsideClick = (event) => {
        const { activepopOver } = this.state
        //event.target.closest(`.PopOverLayer`)
        if (event.target.closest(`.PopOverLayer-${activepopOver}`) === null || activepopOver === "") {
            if (document.getElementsByClassName(`popover-${activepopOver}`).length > 0) {
                document.getElementsByClassName(`popover-${activepopOver}`)[0].classList.remove("popOverhideHelper")
                document.removeEventListener("click", this.handleOutsideClick, true);
            }
            else {
                document.removeEventListener("click", this.handleOutsideClick, true);
            }

        }

    }

    openPopOverEvent = (event, field) => {
        console.log(event);
        event.target.closest(`.popover-${field}`).classList.add("popOverhideHelper")
        document.addEventListener("click", this.handleOutsideClick, true);
        this.setState({ activepopOver: field })
    }
    ApplyPopUpBtn = () => {
        this.props.ApplyBtnEvt(this.state.searchValue, this.props.field)
        this.setState({ searchValue: "" })
    }

    render() {
        console.log("activepopOver", this.state.activepopOver)
        return (
            <div className={`popoverDIV popover-${this.props.field}`} fieldname={this.props.field} >
                <span className="glyphicon glyphicon glyphicon-filter IconColor" aria-hidden="true"
                    onClick={(e) => this.openPopOverEvent(e, this.props.field)}
                >
                </span>
                <div className={`commonPopOver PopOverLayer-${this.props.field} showPop`} >
                    PopOver Layout
                        <input value={this.state.searchValue} onChange={e => this.setState({ searchValue: e.target.value })} />
                    <button onClick={this.ApplyPopUpBtn}>Apply</button>
                </div>
            </div>

        )
    }
}
