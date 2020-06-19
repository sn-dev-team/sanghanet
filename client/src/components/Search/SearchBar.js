import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchBar.scss';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: '',
            dataList: null
        };
    }

    handleInputChange = (e) => {
        this.props.handleInputChange(e.target.value);
    }

    render () {
        return (
            <div className={`search-field ${this.props.customClassName}`}>
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={this.handleInputChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    value={this.props.inputValue}
                />
                <button
                    onClick={this.props.handleIconClick}
                >
                    {this.props.icon}
                </button>
            </div>
        );
    }
}

SearchBar.propTypes = {
    inputValue: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleIconClick: PropTypes.func,
    placeholder: PropTypes.string,
    icon: PropTypes.element,
    iconAlignment: PropTypes.string,
    customClassName: PropTypes.string
};

export default SearchBar;
