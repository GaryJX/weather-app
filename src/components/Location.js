import React from 'react';
import '../assets/css/location.css';

export default function Location(props) {
    return (
        <div className="location">
            <h1>{`${props.name}, ${props.country}`}</h1>
        </div>
    );
}