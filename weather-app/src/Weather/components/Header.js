import * as React from 'react';
import PropTypes from 'prop-types';
import {PageHeader, Glyphicon,Grid,Col} from "react-bootstrap";

class Header extends React.Component{
    render(){        
        const {props: {city}} = this;
        return (
            <Grid>
                <Col xs={6} xsOffset={3} >
                    <PageHeader><Glyphicon glyph="grain" /> {city || "Weather App" }</PageHeader>
                </Col>
            </Grid>
        );
    }
    
}

Header.propTypes = {
    city: PropTypes.string.isRequired
};


export default Header;

