import React from 'react';
import '../assets/css/temperature.css'


export default class Temperature extends React.Component {
    state = {  }
    render() {
        return (
            <div className="temperature">
                <div className="temperature--degree">
                    <h2 className="degree-num">32</h2>
                    <span className="degree-type">F</span>
                </div>
                <div className="temperature--description">Cold</div>
            </div>
        );
    };
}