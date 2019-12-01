
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FilterPopUp.css';

export default class FilterPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            excatBtn: false,
            activepopOver: '',
            error: false
        };
    }

    handleOutsideClick = event => {
        const { activepopOver } = this.state;
        if ((event && event.target.closest(`.PopOverLayer-${activepopOver}`) === null) || activepopOver === '') {
            if (document.getElementsByClassName(`popover-${activepopOver}`).length > 0) {
                document.getElementsByClassName(`popover-${activepopOver}`)[0].classList.remove('popOverhideHelper');
                document.removeEventListener('click', this.handleOutsideClick, true);
            } else {
                document.removeEventListener('click', this.handleOutsideClick, true);
            }
        }
        if (event === undefined && document.getElementsByClassName(`popover-${activepopOver}`).length > 0) {
            document.getElementsByClassName(`popover-${activepopOver}`)[0].classList.remove('popOverhideHelper');
            document.removeEventListener('click', this.handleOutsideClick, true);
        }
    };

    openPopOverEvent = (event, field) => {
        event.stopPropagation();
        event.target.closest(`.popover-${field}`).classList.add('popOverhideHelper');
        document.addEventListener('click', this.handleOutsideClick, true);
        this.setState({ activepopOver: field });
    };

    ApplyPopUpBtn = e => {
        e.stopPropagation();
        const { searchValue, excatBtn } = this.state;
        const { field, ApplyBtnEvt, displayName } = this.props;

        if (searchValue.trim() !== '') {
            ApplyBtnEvt(searchValue, field, excatBtn, displayName);
            this.setState({ searchValue: '', excatBtn: false });
            this.handleOutsideClick();
        } else {
            this.setState({ error: true });
            return false;
        }
        return null;
    };

    handleExactBtn = () => {
        const { excatBtn } = this.state;
        this.setState({ excatBtn: !excatBtn });
    };

    // Check this scenario
    handleErrorChange = e => {
        this.setState({ searchValue: e.target.value, error: false });
    };

    handleChangeEvt = e => {
        if (e.keyCode === 13 && e.target.value !== '') {
            this.ApplyPopUpBtn(e);
        } else {
            return null;
        }
        return null;
    }

    render() {
        const { searchValue, excatBtn, error } = this.state;
        const {
            field, type,
            filterColorEnable
        } = this.props;
        console.log('filterColorEnable :', filterColorEnable);
        return (
            <span
                role='presentation'
                // className={`popoverDIV popover-${field} ${filterColorEnable ? ' filterColorEnable' : ''}`}
                className={`popoverDIV popover-${field} ${filterColorEnable ? ' FilterEnable' : ''}`}
                fieldname={field}
                onClick={e => this.openPopOverEvent(e, field)}
                data-test='filterPopOverComponent'
            >
                <span class="glyphicon glyphicon-filter"></span>

                <div className={`commonPopOver PopOverLayer-${field} showPop table-filter-popup`}>
                    <div className='filter-input-section'>
                        <span class="glyphicon glyphicon-search magnifierIcon"></span>
                        <input
                            placeholder={`${type === 'date' ? 'DD/MM/YYYY HH:mm' : 'Filter this column'}`}
                            type='text'
                            className={`filter-input ${error ? ' errorInput ' : ''}`}
                            value={searchValue}
                            onChange={e => this.handleErrorChange(e)}
                            onKeyDown={e => this.handleChangeEvt(e)}

                        />
                    </div>
                    {/* {
                error ? (
                  <div className='filter-input-section-error'>
                    <span className='tbl-exact'>can't be empty</span>
                  </div>
                ) : (null)
              } */}

                    <div className='filter-table-popup-btmContainer'>
                        {/* <span className='radio-filter-btn'>
                                {' '}
                                <Toggle className='toggle-filter' checked={excatBtn} onChange={this.handleExactBtn} />
                                {' '}
                            </span>
    
                            <span className='tbl-exact'>exact match</span> */}
                        <span
                            role='button'
                            tabIndex='0'
                            //   onKeyPress={commonKeyPress}
                            className='filter-apply-button'
                            onClick={e => this.ApplyPopUpBtn(e)}
                        >
                            Apply
                </span>
                    </div>
                </div>
            </span>
        );
    }
}

FilterPopUp.propTypes = {
    ApplyBtnEvt: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    filterColorEnable: PropTypes.bool.isRequired,
    firstThWidth: PropTypes.object,
    indexTh: PropTypes.number.isRequired,
};

FilterPopUp.defaultProps = {
    firstThWidth: {}
};

