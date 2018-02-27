import {ADD_MARKERS, CLEAR_MARKERS} from '../constants/actions'

const markersReducer = (state=[], action) => {
    switch(action.type) {
        case ADD_MARKERS:
            return [...action.payload.results , ...state];
        case CLEAR_MARKERS:
            state = null;
            return [];
        default:
            return state;
    }
}

export default markersReducer;