import {postProtected} from '../api';
import {push} from 'react-router-redux';
import markers from '../reducers/markers';
import {ADD_MARKERS , ADD_NEAR} from '../constants/actions';


export const saveMarkers = (markers) => (dispatch) => {
    postProtected('//localhost:3001/api/marker/save-markers' , {
        userId: localStorage.getItem('userId'),
        markers,
    }).then(data => {
        console.log('markers were saved');
    })
    .catch(error => {
        dispatch(push('/'))
        console.log(error);
    })
};

export const getMarkers = () => dispatch => {
    postProtected('//localhost:3001/api/marker/get-markers', {
        userId: localStorage.getItem('userId'),
    })
    .then(data => {
        dispatch({type: ADD_MARKERS , payload: data});
    })
    .catch(error => {
        dispatch(push('/'))
        console.log('error', error);
    });
}   

export const getNearObjects = ({location , radius , type}) => dispatch => {
    postProtected('//localhost:3001/api/marker/near', {
        location,
        radius,
        type,
    })
    .then(data => {
        dispatch({type: ADD_NEAR , payload: data.data});
    })
    .catch(error => {
        dispatch(push('/'))
        console.log('error', error);
    });
}
