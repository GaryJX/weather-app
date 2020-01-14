import React from 'react';
import '../assets/css/location.css';
// TODO: This API Key should be hidden (not in public repos)
const API_KEY =  '2c07d9441e6da9251b5e9b6dbca5afe8';
const BASE_API_URL = 'https://api.darksky.net/forecast';

export default class Location extends React.Component {
    constructor(props) {
        super(props);
        this.getCoordinates();
        this.state = {

        }
    }

    getCoordinates = () => {
        let long, lat;

        // Check if has access to user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position);
                lat = position.coords.latitude;
                long = position.coords.longitude;


                const api_url = `${BASE_API_URL}/${API_KEY}/${lat},${long}`;
                // Make API Request to retrieve weather data for current location
                fetch(api_url).then(response => {

                }).catch((error) => {
                    console.error(error);
                    // TODO: Do Stuff in case of failure
                });
            });
        } else {
            // TODO
            console.log('Cannot access geolocation')
        }
    }
    render() {
        return (
            <div className="location">
                <h1 className="location--timezone">Timezone</h1>
                <p>Icon</p>
            </div>
        );
    };
}