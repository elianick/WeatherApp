import axios from 'axios';

const WEATHER_API = "bfc079575bff7ec0b8e4a53770e35ec7";

export const weatherActionTypes = {
    WEATHER_LOAD: "weather/load",
    WEATHER_CLEAR: "weather/clear",
    WEATHER_ERROR: "weather/error",

};


export const clearData = () => ({
    type: weatherActionTypes.WEATHER_CLEAR
});
// also using function...
export function clearDataV2() {
    return { type: weatherActionTypes.WEATHER_CLEAR }
};


// si una funcion lambda tiene solo un argumento tambien se puede escribir sin parentesis
export const errorData = error => ({
    type: weatherActionTypes.WEATHER_ERROR,
    payload: error
});


const loadData = response => ({
    type: weatherActionTypes.WEATHER_LOAD,
    payload: {
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
    }
});

// inpure function
// bind is not required
export function loadWeatherDataByPosition(latitude, longitude) {
    return (dispatch) => {
        dispatch(clearData());
        axios("http://api.openweathermap.org/data/2.5/forecast/daily",
            {
                params: {
                    units: "metric",
                    lang: "it",
                    lat: latitude,
                    lon: longitude,
                    appid: WEATHER_API
                }

            })
            .then(response => dispatch(loadData(response)))
            .catch(error => dispatch(errorData(error.message)));
    }
}

export function loadWeatherDataByCityId(cityId) {
    return (dispatch) => {
        dispatch(clearData());
        return axios("http://api.openweathermap.org/data/2.5/forecast/daily",
            {
                params: {
                    units: "metric",
                    lang: "it",
                    id: cityId,
                    appid: WEATHER_API
                }

            })
            .then(response => dispatch(loadData(response)))
            .catch(error => dispatch(errorData(error.message)));
    }
}