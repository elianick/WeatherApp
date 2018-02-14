import {mount, configure} from "enzyme";
import WeatherForecast from "./WeatherForecast";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe("WeatherForecast", () => {
    it("should render properly", () => {
        const props = {
            loading: false,
            forecast: [],
            error: false,
            city: "Valencia",
            loadDataByCityId: () => {
            },
            loadDataByPosition:() =>{                
            },
            errorData: () => {
            }
        };
        const wrapper = mount(<WeatherForecast {...props}/>);
        console.log(wrapper.text());

    });
});


