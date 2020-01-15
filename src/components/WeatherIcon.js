import React from 'react';

export default function WeatherIcon(props) {

    let { icon } = props;
    icon = icon.toLowerCase();
    console.log(icon);

    const mapIcons = {
        clouds: 'wi-day-cloudy',
        rain: 'wi-day-rain',
        snow: 'wi-day-snow', 
        clear: 'wi-day-sunny',
        drizzle: 'wi-day-rain',
        mist: 'wi-day-rain-mix',
    };

    const iconClass = mapIcons[icon];

    if (iconClass === undefined) {
        return null;
    } else {
        return (
            <span className={`weather-logo wi ${iconClass}`}/>
        );
    }
}