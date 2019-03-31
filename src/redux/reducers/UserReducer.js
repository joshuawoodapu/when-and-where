import {
    USER_LOAD,
    PLANS_LOAD,
    CUSTOM_ACTIVITIES_LOAD
} from '../actions/types'

const INITIAL_STATE = {
    fullName: '',
    plans: {},
    customActivities: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOAD:
            return {...state, fullName:action.payload}
        case PLANS_LOAD:
            return {...state, plans:action.payload}
        case CUSTOM_ACTIVITIES_LOAD:
            return {...state, customActivities:action.payload}
        default:
            return state;
    }
};
