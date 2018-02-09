import React, { Component } from 'react';
import { Grid, PageHeader, Glyphicon, Col, Row } from 'react-bootstrap';
import WeatherForecast from "./WeatherForecast";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PageHeader><Glyphicon glyph="grain" /> {"Weather App"}</PageHeader>
        <Grid>
          <Row>
            <Col sm={12}>
              <WeatherForecast />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
