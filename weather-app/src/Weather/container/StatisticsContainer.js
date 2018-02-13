/**
 * Created by alrs on 11/07/2017.
 */
// @flow
import {connect} from "react-redux";
import Statistics from "../components/Statistics";

const mapReduce = (array, searchValue) => 
(array.map(r => r.description.includes(searchValue)? 1 : 0).reduce((acc, current) => acc + current, 0));

const mapStateToProps = state => ({
    loading: state.loading,
    error: state.error,
    sunnyDays: mapReduce(state.forecast, "cielo sereno"),
    rainyDays: mapReduce(state.forecast, "pioggia")
});

export default connect(mapStateToProps)(Statistics);