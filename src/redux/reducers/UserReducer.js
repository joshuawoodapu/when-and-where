import {
    USER_LOAD,
    PLANS_LOAD,
    CUSTOM_ACTIVITIES_LOAD
} from '../actions/types'

const INITIAL_STATE = {
    fullName: '',
    plans: {},
    ownedPlans: [],
    collabPlans: [],
    customActivities: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOAD:
            var formattedOwnedPlans = [].concat.apply([], Object.values(action.payload.ownedPlans).map(Object.values));
            return {...state, fullName:action.payload.fullName, ownedPlans: formattedOwnedPlans}
        case PLANS_LOAD:
            return {...state, plans: {...state.plans, [action.payload.planId]: action.payload.planData} }
        case CUSTOM_ACTIVITIES_LOAD:
            return {...state, customActivities:action.payload}
        default:
            return state;
    }
};
