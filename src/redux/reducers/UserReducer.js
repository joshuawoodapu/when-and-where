import {
    USER_LOAD
} from '../actions/types'

const INITIAL_STATE = {
    fullName: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOAD:
            return {...state, fullName:action.payload}
        default:
            return state;
    }
};
