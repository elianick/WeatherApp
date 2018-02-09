import React, { Component } from 'react';
import axios from 'axios';
import WeatherCard from "./WeatherCard";
import {
    Alert,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Grid,
    Row,
    ProgressBar
} from "react-bootstrap";
const WEATHER_API = "bfc079575bff7ec0b8e4a53770e35ec7";

class WeatherForecast extends Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            error: false,
            errorMessage: "",
            city: "",
            selectedCityId: "",
            forecast: []
        };
        this.processResponse = this.processResponse.bind(this); // binding not required
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.loadCityByCurrentLocation = this.loadCityByCurrentLocation.bind(this);
    }

    processResponse(response) {
        this.setState({
            loading: false,
            city: response.data.city.name,
            forecast: response.data.list.map(
                weather => ({
                    date: weather.dt,
                    icon: weather.weather[0].icon,
                    description: weather.weather[0].description,
                    humidity: weather.humidity,
                    minTemp: weather.temp.min,
                    maxTemp: weather.temp.max,
                })
            )
        })
        //console.log(this.state);
    }

    componentDidMount() {
        this.loadCityByCurrentLocation();
    }

    loadCityByCoordinates(latitude, longitude) {
        //console.log("calling openweather");
        axios("http://api.openweathermap.org/data/2.5/forecast/daily", {
            params: {
                units: "metric",
                lang: "es",
                lat: latitude,
                lon: longitude,
                appid: WEATHER_API
            }
        }).then(response => {
            this.processResponse(response);
        })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: error.message
                })
            });
    }

    loadCityByCurrentLocation() {
       // console.log("loading by current location");
        this.setState({ loading: true });
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(
                position => {
                    this.loadCityByCoordinates(position.coords.latitude, position.coords.longitude);
                    this.setState({ loading: false });
                },
                error => {
                    console.log("geo location is not active");
                    this.setState({
                        loading: false,
                        error: true,
                        errorMessage: error.message
                    });
                }
            )
        } else {
            this.setState({
                loading: false,
                error: true,
                errorMessage: "Geo location disabled"
            })
        }
    }

    loadCityById(cityId) {
        //console.log("calling openweather");
        axios("http://api.openweathermap.org/data/2.5/forecast/daily", {
            params: {
                units: "metric",
                lang: "es",
                id: cityId,
                appid: WEATHER_API
            }
        }).then(response => {
            this.processResponse(response);
        })
            .catch(error => {
                this.setState({
                    error: true,
                    errorMessage: error.message
                })
            });

    }

    onChangeHandler(event) {
        const { target: { value: cityId } } = event;
        console.log(cityId);
        this.setState({ selectedCityId: cityId,
        loading: true });

        if (cityId !== "CR") {
            this.loadCityById(cityId);
        }else{
            this.loadCityByCurrentLocation();
        }
    }

    render() {
        const { state: { loading,city, forecast, error, errorMessage }, onChangeHandler } = this;
        const LoadingComponent = () => loading ? <ProgressBar active now={100}/> : <h1>City <small>{city}</small></h1>;
        return (
            <div>
                <LoadingComponent/>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Form horizontal>
                                <FormGroup id="formControlsSelect">
                                    <Col xs={3}> <ControlLabel>Select City</ControlLabel></Col>
                                    <Col xs={9}>
                                        <FormControl id="citySelect" componentClass="select" placeholder="select"
                                            value={this.state.selectedCityId}
                                            onChange={onChangeHandler}>
                                            <option value="CR">Current Location</option>
                                            <option value="360630">El Cairo</option>
                                            <option value="2643743">London</option>
                                            <option value="3128759">Barcelona</option>
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Grid>
                {error && errorMessage && <Alert bsStyle="danger"> {errorMessage} </Alert>}
                {forecast.length > 0 && <Grid><Row>{forecast.map((date, index) => (
                    <Col key={index} xs={index === 0 ? 6 : 3}>
                        <WeatherCard weather={date}/>
                    </Col>))}  </Row></Grid>
                }


            </div>
        );
    }



}


export default WeatherForecast;
