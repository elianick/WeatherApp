import { weatherActionTypes } from "./WeatherActions";

const initialState = {
    loading: true,
    error: false,
    errorMessage: "",
    city: "",
    forecast: []
};

const weatherReducer = (state = initialState, action) => {

    switch (action.type) {
        case weatherActionTypes.WEATHER_LOAD: {
            return {
                ...state, // it creates a copy of initial state using rest spread operator
                loading: false, // it overrides the value of initial state
                error: false,
                errorMessage: "",
                city: action.payload.city,
                forecast: action.payload.forecast
            };

        }
        case weatherActionTypes.WEATHER_ERROR: {
            return {
                ...state,
                error: true,
                errorMessage: action.payload.error,
                forecast: [],
                loading: false
            }

        }
        case weatherActionTypes.WEATHER_CLEAR:
            return state;
        default:           
            return state;
    }
}

export default weatherReducer;

