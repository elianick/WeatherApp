import React from 'react';
import PropTypes from 'prop-types';
import WeatherCard from "./WeatherCard";
import {
    Alert,
    Col,
    Grid,
    Row,
    ProgressBar,
    Form,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";


class WeatherForecast extends React.Component {

    constructor(props) {
        super(props);

        this.loadByCurrentLocation = this.loadByCurrentLocation.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    onChangeHandler(event){
        const { target: { value: cityId } } = event;
        console.log(cityId);
        if (cityId !== "CR") {
            this.props.loadDataByCityId(cityId);
        }else{
            this.loadByCurrentLocation();
        }

    }

    loadByCurrentLocation() {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log("component did mount");
                    this.props.loadDataByPosition(position.coords.latitude, position.coords.longitude);

                },
                error => {
                    this.props.errorData(error.message);
                }
            )
        } else {
            this.props.errorData("Geo-location Disabled");
        }
    }
    componentDidMount() {
        this.loadByCurrentLocation();
        console.log(this.props);

    }



    render() {
        const { props: { loading, city, forecast, error, errorMessage } } = this;
        const LoadingComponent = () => loading ? <ProgressBar active now={100} /> : "";
        console.log(city);
        return (
            <div>
                <LoadingComponent />
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Form horizontal>
                                <FormGroup controlId="formControlsSelect">
                                    <Col xs={4} componentClass={ControlLabel}> Select City</Col>
                                    <Col xs={4}>
                                        <FormControl id="citySelect" componentClass="select" placeholder="select"                                           
                                            onChange={this.onChangeHandler}
                                           >
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


                {forecast.length > 0 && <Grid><Row>{forecast.map((date, index) => (
                    <Col key={index} xs={index === 0 ? 6 : 3}>
                        <WeatherCard weather={date} />
                    </Col>))}  </Row></Grid>
                }
                {error && errorMessage && <Alert bsStyle="danger"> {errorMessage} </Alert>}

            </div>
        );
    }
}

WeatherForecast.propTypes = {
    city: PropTypes.string,
    forecast: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.number,
        description: PropTypes.string,
        humidity: PropTypes.number,
        icon: PropTypes.string,
        maxTemp: PropTypes.number,
        minTemp: PropTypes.number
    })),
    loadDataByCityId: PropTypes.func.isRequired,
    loadDataByPosition: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    errorData: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

export default WeatherForecast;
