import {
    PLAN_SET
} from '../actions/types'

const INITIAL_STATE = {
    planName: 'NO PLAN SELECTED',
    
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAN_SET:
            return {...state, planName: action.payload.planName}
        default:
            return state;
    }
};
