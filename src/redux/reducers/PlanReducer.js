import {
    PLAN_SET
} from '../actions/types'

const INITIAL_STATE = {
    owner: 'N/A',
    planName: 'NO PLAN SELECTED',
    privacy: 'Private',
    startDate: '01/01/0001',
    activities: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAN_SET:
            return {...state, 
                owner: action.payload.owner, 
                planName: action.payload.planName, 
                privacy: action.payload.privacy, 
                startDate: action.payload.startDate }
        default:
            return state;
    }
};
