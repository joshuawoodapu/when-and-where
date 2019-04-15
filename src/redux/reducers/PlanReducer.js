import {
    PLAN_SET,
    LOG_OUT
} from '../actions/types'

const INITIAL_STATE = {
    planId: '',
    owner: 'N/A',
    planName: 'NO PLAN SELECTED',
    privacy: 'Private',
    startDate: '01/01/0001',
    activitySlots: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAN_SET:
            return {...state,
                planId: action.payload.planId,
                owner: action.payload.owner,
                planName: action.payload.planName,
                privacy: action.payload.privacy,
                startDate: action.payload.startDate,
                activitySlots: action.payload.activitySlots}
        case LOG_OUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
