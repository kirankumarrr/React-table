
import React from 'react';
// import { Icon } from '@pie/react-components';
import PropTypes from 'prop-types';
// import { commonKeyPress } from '../../commonFunctions/commonKeyPress';
import './FilteredView.css';


const FilteredView = ({
    filterCollection,
    clearAllFilter,
    clearglobalSearch,
    clearfilterSearch }) => {
    // const result = Object.keys(filterCollection).map(key => [key, filterCollection[key]]);

    if (filterCollection) {
        return (
            <div id='filteredView'>
                <div className='filter-list-items'>
                    {
                        filterCollection
                            && filterCollection.globalSearchText !== '' ? (
                                <div key={`${filterCollection.globalSearchText}`} className='filter-list-item'>
                                    <p title={filterCollection.globalSearchText} className='global-all-class'>
                                        {`All: ${filterCollection.globalSearchText.length > 20
                                            ? `${`${filterCollection.globalSearchText.substring(0, 12)}...`}`
                                            : filterCollection.globalSearchText}`}
                                    </p>
                                    <span
                                        role='presentation'
                                        className='filter-close'
                                        data-test='global-filter-close'
                                        onClick={clearglobalSearch}
                                    >
                                        <span class="glyphicon glyphicon-remove-circle"></span>
                                    </span>
                                </div>
                            ) : null
                    }

                    {filterCollection
                        && filterCollection.columnNames
                        && filterCollection.columnNames.map((value, index) => {
                            const indexFilter = index;
                            const textToDisplay = value.searchValue.length > 20
                                ? value.searchValue.substring(0, 20)
                                : value.searchValue;
                            return (
                                <div
                                    key={`${indexFilter}`}
                                    className='filter-list-item'
                                >
                                    {/* <p>{`${res.displayName}: ${res.searchValue}`}</p> */}
                                    <p className='filtered-display-columnContainer'>
                                        <span
                                            className='filtered-display-columnName'
                                            title={value.displayName}
                                        >
                                            {value.displayName}
                                        </span>
                                        <span className='filtered-display-colon'>
                                            {' '}
                                            {':'}
                                            {' '}
                                        </span>
                                        <span
                                            className='filtered-display-columnValue'
                                            title={value.searchValue}
                                        >
                                            {textToDisplay}
                                        </span>
                                    </p>
                                    <p
                                        className='filter-close'
                                        role='presentation'
                                        data-test={`colmn-filter-close-${indexFilter}`}
                                        onClick={() => clearfilterSearch(value.columnName)}
                                    >
                                        <span class="glyphicon glyphicon-remove-circle"></span>
                                    </p>
                                </div>
                            );
                        }
                        )}
                    {
                        filterCollection
                            && (filterCollection.globalSearchText !== ''
                                || (filterCollection.columnNames && filterCollection.columnNames.length > 0)) ? (
                                <span
                                    // onKeyPress={commonKeyPress}
                                    role='button'
                                    tabIndex='0'
                                    className='filtered-remove'
                                    onClick={clearAllFilter}
                                >
                                    Clear all
                  </span>
                            ) : null
                    }
                </div>
            </div>
        );
    }
    return null;
};


FilteredView.propTypes = {
    filterCollection: PropTypes.object.isRequired,
    clearfilterSearch: PropTypes.func.isRequired,
    clearglobalSearch: PropTypes.func.isRequired,
    clearAllFilter: PropTypes.func.isRequired
};
export default FilteredView;
