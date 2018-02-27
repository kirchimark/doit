import {connect} from 'react-redux';
import {saveMarkers , getMarkers, getNearObjects} from '../actions/markers'
import MapScreen from '../components/Map';

const mapStateToProps = (state) =>  { 
    return ({
    markers: state.markersReducer,
    near: state.nearReducer,
}) };

const mapDipspatchToProps = (dispatch) => ({
    saveMarkers: (markers) => dispatch(saveMarkers(markers)),
    getMarkers: () => dispatch(getMarkers()),
    getNearObjects: (config) => dispatch(getNearObjects(config)),
});

export default connect(mapStateToProps,mapDipspatchToProps)(MapScreen);