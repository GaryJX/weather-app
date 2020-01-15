import React from 'react';
import {TextField} from '@material-ui/core';
import '../assets/css/searchBar.css'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cityValue: '',
            countryValue: '',
            cityMissing: false,
        }
    }

    handleCityValueChange = (event) => {
        const cityValue = event.target.value;

        if (this.state.cityMissing && cityValue !== '') {
            this.setState({ cityMissing: false });
        }

        this.setState({ cityValue });
    }

    handleSearch = (event) => {
        event.preventDefault();
        if (this.state.cityValue === '') {
            this.setState({ cityMissing: true });
        } else {
            this.props.onSearchHandler(this.state);
        }
    }

    render() {
        return (
            <form className={'search-bar'} onSubmit={this.handleSearch}>
                <input 
                    type='text' 
                    className={`search-bar--input city ${this.state.cityMissing ? 'error' : ''}`}
                    value={this.state.cityValue} 
                    onChange={this.handleCityValueChange}
                    placeholder='City'
                />
                <input 
                    type='text' 
                    className='search-bar--input country' 
                    value={this.state.countryValue}
                    onChange={(event) => this.setState({ countryValue: event.target.value })}
                    placeholder='Country'
                />
                <input type='submit' className='search-bar--submit' />
            </form>
        );
    };
}