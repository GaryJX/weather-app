import React from 'react';
import '../assets/css/location.css';
import TemperatureIcon from './WeatherIcon';
// TODO: This API Key should be hidden (not in public repos)
const API_KEY =  '2c07d9441e6da9251b5e9b6dbca5afe8';
const BASE_API_URL = 'https://api.darksky.net/forecast';

export default function Location(props) {
    return (
        <div className="location">
            <h1>{`${props.name}, ${props.country}`}</h1>
        </div>
    );
}