import React, { Component } from 'react';
import { Grid, PageHeader, Glyphicon, Col, Row } from 'react-bootstrap';
import WeatherForecast from "./WeatherForecast";
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state ={
       city: " Current Location" 
    };
    this.modifyCity = this.modifyCity.bind(this);
  }

  modifyCity(city) {
    this.setState({ city: city });
  }

  render() {
    const { state: { city } } = this;
    return (
      <div className="App">
        <PageHeader><Glyphicon glyph="grain" /> {city || "Weather App" }</PageHeader>
        <Grid>
          <Row>
            <Col sm={12}>
              <WeatherForecast modifyCity={this.modifyCity}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
