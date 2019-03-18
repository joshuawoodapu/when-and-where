import {
    USER_LOAD,
    PLANS_LOAD
} from '../actions/types'

const INITIAL_STATE = {
    fullName: '',
    plans: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOAD:
            return {...state, fullName:action.payload}
        case PLANS_LOAD:
            return {...state, plans:action.payload}
        default:
            return state;
    }
};
