import {mount} from "enzyme";
import WeatherForecast from "./WeatherForecast";
import React from "react";

describe("WeatherForecast", () => {
    it("should render properly", () => {
        const props = {
            loading: false,
            city: "Valencia",
            loadDataByCityId: () => {
            },
            loadDataByPosition:() =>{                
            },
            errorData: () => {
            }
        };
        const wrapper = mount(<WeatherForecast {...props}/>);
      //  expect(wrapper.find('h1').text()).toBe('CityValencia');
      //  expect(wrapper.find('small').text()).toBe('Valencia');

    });
});


