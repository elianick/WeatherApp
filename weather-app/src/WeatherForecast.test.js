import WeatherForecast from "./WeatherForecast";
import {configure, shallow} from "enzyme";
import sinon from "sinon";
import React from "react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import Adapter from "enzyme-adapter-react-15";

describe("weather forecast", () => {
    const serviceResponse = {
        "city": {
            "id": 6295630,
            "name": "Earth",
            "coord": {
                "lon": 0,
                "lat": 0
            },
            "country": "",
            "population": 2147483647
        },
        "cod": "200",
        "message": 0.1164634,
        "cnt": 7,
        "list": [
            {
                "dt": 1508238000,
                "temp": {
                    "day": 26.19,
                    "min": 25.96,
                    "max": 26.27,
                    "night": 26.15,
                    "eve": 26.26,
                    "morn": 25.96
                },
                "pressure": 1028.15,
                "humidity": 100,
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "cielo claro",
                        "icon": "01d"
                    }
                ],
                "speed": 2.96,
                "deg": 213,
                "clouds": 0
            },
            {
                "dt": 1508324400,
                "temp": {
                    "day": 25.94,
                    "min": 25.72,
                    "max": 26.05,
                    "night": 25.72,
                    "eve": 26.05,
                    "morn": 25.97
                },
                "pressure": 1027.72,
                "humidity": 100,
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "nubes",
                        "icon": "04d"
                    }
                ],
                "speed": 5.78,
                "deg": 216,
                "clouds": 88
            }
        ]
    };
    const modifyCity = sinon.spy();
    const mock = new MockAdapter(axios);

    beforeAll(() => {
        configure({adapter: new Adapter()});
        mock
            .onGet("http://api.openweathermap.org/data/2.5/forecast/daily")
            .reply(200, serviceResponse);
    });

    it("should mount correctly", () => {
        const wrapper = shallow(<WeatherForecast modifyCity={modifyCity}/>);
        expect(wrapper.find("Grid").length).toBe(1);
    });

    it("should load a city by id", (done) => {
        const wrapper = shallow(<WeatherForecast modifyCity={modifyCity}/>);
        const event = {target: {name: "", value: 360630}};
        wrapper.find("#citySelect").simulate("change", event);
        setTimeout(() => {
            expect(wrapper.state("selectedCityId")).toBe(360630);
            expect(wrapper.state("forecast").length).toEqual(2);
            done();
        }, 50);
    });

    it("should display a set of forecast cards, given lat long API request", (done) => {
        const wrapper = shallow(<WeatherForecast modifyCity={modifyCity}/>);
        wrapper.instance().loadCityByCoordinates(0, 0);
        setTimeout(() => {
            expect(wrapper.state("forecast").length).toBe(2);
            done();
        }, 50);
    });

    it("should display an error message when load by id fails", (done) => {
        mock.reset();
        mock
            .onGet("http://api.openweathermap.org/data/2.5/forecast/daily")
            .replyOnce(500, {message: "Test"});
        const wrapper = shallow(<WeatherForecast modifyCity={modifyCity}/>);
        const event = {target: {name: "", value: 360630}};
        wrapper.find("#citySelect").simulate("change", event);
        setTimeout(() => {
            expect(wrapper.state("error")).toBe(true);
            expect(wrapper.state("errorMessage")).toContain("Request failed with status code 500");
            done();
        }, 500);
    });

    it("should display an error message, when Weather API fails", (done) => {
        mock.reset();
        mock
            .onGet("http://api.openweathermap.org/data/2.5/forecast/daily")
            .replyOnce(500, {message: "Test"});
        const wrapper = shallow(<WeatherForecast modifyCity={modifyCity}/>);
        wrapper.instance().loadCityByCoordinates(0, 0);
        setTimeout(() => {
            expect(wrapper.state("error")).toBe(true);
            expect(wrapper.state("errorMessage")).toContain("Request failed with status code 500");
            done();
        }, 50);
    });

});