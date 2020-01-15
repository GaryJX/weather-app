import React from 'react';
import '../assets/css/temperature.css' 

export default class Temperature extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCelsius: true,
        }
    }

    displayTemperature = () => {
        const temp = convertDegressKelvin(this.props.temp, this.state.isCelsius);
        const temp_min = convertDegressKelvin(this.props.temp_min, this.state.isCelsius);
        const temp_max = convertDegressKelvin(this.props.temp_max, this.state.isCelsius);

        const degreeType = this.state.isCelsius ? '°C' : '°F';

        return (
            <>
                <div className='current-temp'>                
                    <h2 className="degree-num">{temp}</h2>
                    <h2 className="degree-type">{degreeType}</h2>
                </div>
                <div className='min-max-temp'>
                    <div className='min-temp'>
                        <h3 className="degree-num">{temp_min}</h3>
                        <h3 className="degree-type">{degreeType}</h3>
                    </div>
                    <div className='max-temp'>
                        <h3 className="degree-num">{temp_max}</h3>
                        <h3 className="degree-type">{degreeType}</h3>
                    </div>
                </div>
            </>
        );
    }
    render() {
        return (
            <div className="temperature">
                <div onClick={() => {this.setState({ isCelsius: !this.state.isCelsius})}} className="temperature--degree">
                    {this.displayTemperature()}
                </div>
                <div className="temperature--description">{this.props.description}</div>
            </div>
        );
    };
}

function convertDegressKelvin(tempKelvin, isCelsius) {
    let convertedTemp = tempKelvin - 273.15; // Converted to Degrees Celsius

    if (!isCelsius) {
        convertedTemp = convertedTemp * 1.8 + 32; // Converted to Degress Fahrenheit
    }

    return Math.round(convertedTemp);
}
