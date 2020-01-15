import React from 'react';
import './assets/css/weather-app.css';
import 'weather-icons/css/weather-icons.css'
import Location from './components/Location'
import Temperature from './components/Temperature'
import SearchBar from './components/SearchBar';

import './assets/css/location.css';
import TemperatureIcon from './components/WeatherIcon';
import WeatherIcon from './components/WeatherIcon';
// TODO: This API Key should be hidden (not in public repos)
// const API_KEY =  '2c07d9441e6da9251b5e9b6dbca5afe8';
// const BASE_API_URL = 'https://api.darksky.net/forecast';

const API_KEY = 'f4251a7e73d6dfe509cd347b0c34b13b';
// const API_KEY = '429736441cf3572838aa10530929f7cd'; // Remove this later, this is someone else's API Key
const BASE_API_URL = `api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}`;


export default class WeatherApp extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      noSearchTarget: true,
      errorMessage: '',
      searchBarClass: '',
      icon: '',
      description: '',
      temp: null,
      temp_min: null,
      temp_max: null,
      country: '',
      name: '',
    }

    this.getLocationWeatherData();
  }

  // Ask the user for their location and display the data for their location if allowed
  getLocationWeatherData() {
    let lon, lat;

    // Check if has access to user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            // ! Proxy just for getting around CORS in dev environment, remove this later
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api_url = `${proxy}${BASE_API_URL}&lat=${lat}&lon=${lon}`;
            this.queryAndDisplayWeatherData(api_url);
        });
    }
  }

  // Make API Request to retrieve weather data for 
  // the specified location, then display it to the user
  queryAndDisplayWeatherData = (api_url) => {
    if (this.state.noSearchTarget) {
      this.setState({ searchBarClass: 'align-top' }, () => {
        setTimeout(() => {
          this.setState({ noSearchTarget: false });
          this.triggerApiRequest(api_url);
        }, 500);
      });
    } else {
      this.triggerApiRequest(api_url);
    }
  }

  triggerApiRequest = (api_url) => {
    this.setState({ loading: true, errorMessage: '' });
    fetch(api_url).then(response => {
      if (response.status === 404) {
        this.setState({ errorMessage: 'Location not found.\nPlease check your spelling.' });
        return false;
      }
      return response.json();
    }).then(data => {
      if (!data) 
        return;
      const { main, description } = data.weather[0];
      // Temperatures are stored in Kelvin
      const { temp, temp_min, temp_max } = data.main;
      const { country } = data.sys;
      const name = data.name;

      this.setState({ icon: main, description, temp, temp_min, temp_max, country, name });
    }).catch(() => {
      this.setState({ errorMessage: 'Failed to retrieve weather data.' });
      console.error('Failed to retrieve data from API');
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

  updateTemperatureData = (tempFahrenheit, summary, timezone) => {
    const tempCelsius = convertFahrenheitToCelsius(tempFahrenheit);
    tempFahrenheit = Math.round(tempFahrenheit);
    this.setState({ tempFahrenheit, tempCelsius, summary, timezone });
  }

  handleSearch = (searchValues) => {
    // ! Proxy just for getting around CORS in dev environment, remove this later
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const api_url = `${proxy}${BASE_API_URL}&q=${searchValues.cityValue.trim()},${searchValues.countryValue.trim()}`;
    this.queryAndDisplayWeatherData(api_url);
  }

  displayWeatherData() {
    if (this.state.errorMessage) {
      return <pre className='error-message'>{this.state.errorMessage}</pre>
    } else if (this.state.noSearchTarget) {
      return null;
    } else if (this.state.loading) {
      return <img className='loading' src={require("./assets/images/loading.svg")}/>
    } else {
      return (
        <>
          <Location name={this.state.name} country={this.state.country} />
          <WeatherIcon icon={this.state.icon} />
          <Temperature temp={this.state.temp} temp_min={this.state.temp_min} temp_max={this.state.temp_max} description={this.state.description} />
        </>
      )
    }
  }

  header = () => {
    const headerClass = this.state.searchBarClass === '' ? '' : 'hidden';
    return (
      <div className={`header ${headerClass}`}>
          <div className='wi wi-day-lightning'></div>
          <h1>Weather Buddy</h1>
      </div>
    );
  }

  logo = () => {
    const logoClass = this.state.searchBarClass === '' ? 'hidden' : '';
    return (
      <div className={`logo ${logoClass}`} onClick={this.resetSearch}>
        <span className='wi wi-day-lightning'></span>
      </div>
    );
  }

  resetSearch = () => {
    this.setState({ noSearchTarget: true, searchBarClass: '', errorMessage: '' });
  }

  render() {
    return (
      <>
        {this.logo()}
        <div className={`header-container ${this.state.searchBarClass}`}>
          {this.header()}
          <SearchBar searchValue={this.state.searchValue} searched={this.state.searched} onSearchHandler={this.handleSearch} />
        </div>
        {this.displayWeatherData()}
      </>
    );
  }
}

function convertFahrenheitToCelsius(tempFahrenheit) {
  return Math.round((tempFahrenheit - 32) * 5 / 9);
}

//         <></>
          {/* <Location updateTempData={this.updateTemperatureData} timezone={this.state.timezone} />
          <TemperatureIcon ref={(ref) => this.tempIcon = ref}/>
          <Temperature tempFahrenheit={this.state.tempFahrenheit} tempCelsius={this.state.tempCelsius} summary={this.state.summary} /> */}
