import {ADD_NEAR} from '../constants/actions'

const nearReducer = (state=[], action) => {
    switch(action.type) {
        case ADD_NEAR:
            return [...action.payload];
        default:
            return state;
    }
}

export default nearReducer;