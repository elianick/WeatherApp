import { connect } from 'react-redux';
import WeatherForecast from "./../components/WeatherForecast";
import {errorData, loadWeatherDataByCityId, loadWeatherDataByPosition} from "./../store/WeatherActions";

const mapStateToProps = state => ({
    city: state.city,
    forecast: state.forecast,
    error: state.error,
    errorMessage: state.errorMessage,
    loading: state.loading

});

const mapDispatchToProps = dispatch => ({
    errorData: error => {
        dispatch(errorData(error))
    },
    loadDataByPosition: (latitude, longitude) => {
        dispatch(loadWeatherDataByPosition(latitude,longitude));
    },
    loadDataByCityId: cityId => {
        dispatch(loadWeatherDataByCityId(cityId));
    }
});

const WeatherForecastContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherForecast);
export default WeatherForecastContainer;