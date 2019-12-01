import React, { Component } from 'react';
// import { Icon } from '@pie/react-components';
import PropTypes from 'prop-types';
import './GlobalSearch.css';

export default class GlobalSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChangeEvt = e => {
        const { value } = this.state;
        const { onEnterEvnt } = this.props;
        if (e.keyCode === 13 && value !== '' && value.trim() !== '') {
            onEnterEvnt(value);
            this.setState({ value: '' });
        } else {
            return null;
        }
        return null;
    };

    render() {
        const { placeholder } = this.props;
        const { value } = this.state;
        return (
            <div className='filter-input-section commonSearchInput' data-test='SearchInputBtnComponent'>
                <span class="glyphicon glyphicon-search magnifierIcon"></span>
                <input
                    data-test='SearchInputBtnComponent-Evt'
                    placeholder={placeholder}
                    type='text'
                    className='filter-input filter-input-global-test'
                    value={value}
                    onKeyDown={this.handleChangeEvt}
                    onChange={e => this.setState({ value: e.target.value })}
                />
            </div>
        );
    }
}
GlobalSearch.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onEnterEvnt: PropTypes.func.isRequired
};

