import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from "react-bootstrap";

class WeatherCard extends Component {



    render() {
        const {props: {weather}} = this;
        const date = new Date(weather.date * 1000);
        const title = (<span>
            <img alt="forecast" height="32" src={`http://openweathermap.org/img/w/${weather.icon}.png`}/>
            {`${date.toLocaleDateString()}`}</span>);
        return (
            <div>
                <Panel bsStyle="info">
                    <Panel.Heading>{title}</Panel.Heading>
                    <Panel.Body>
                        <p><strong> Description: {`${weather.description}`} </strong></p>
                        <p><strong> Max: {`${weather.maxTemp}º C`} </strong></p>
                        <p><strong> Min: {`${weather.minTemp}º C`} </strong></p>
                        <p><strong> Humidity: {`${weather.humidity}%`} </strong></p>

                    </Panel.Body>
                </Panel>
            </div>
        );
    }

}

WeatherCard.propTypes = {
    weather: PropTypes.shape({
        date: PropTypes.number,
        icon: PropTypes.string,
        description: PropTypes.string,
        humidity: PropTypes.number,
        minTemp: PropTypes.number,
        maxTemp: PropTypes.number
    }).isRequired
};

WeatherCard.defaultProps = {
    weather: {
        date: new Date(),
        icon: "",
        description: "no description available",
        humidity: 50,
        minTemp: 0,
        maxTemp: 99

    }
};


export default WeatherCard;