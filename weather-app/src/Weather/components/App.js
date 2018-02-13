import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import WeatherForecastContainer from "../container/WeatherForecastContainer";
import HeaderContainer from "../container/HeaderContainer";
import StatisticsContainer from "../container/StatisticsContainer";


class App extends React.Component {

  render() {
   return (
      <div>
        <HeaderContainer />
        <Grid>
          <Row>
            <Col sm={12}>
              <WeatherForecastContainer />
            </Col>
          </Row>
          <Row>
            <Col sm={6} smOffset={3}>
                <StatisticsContainer/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;