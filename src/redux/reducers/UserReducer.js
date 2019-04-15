import {
    USER_LOAD,
    PLANS_LOAD,
    CUSTOM_ACTIVITIES_LOAD
} from '../actions/types'

const INITIAL_STATE = {
    fullName: '',
    plans: {},
    ownedPlans: [],
    collabForPlans: [],
    customActivities: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOAD:
            var formattedOwnedPlans;
            if (action.payload.ownedPlans === undefined)
                formattedOwnedPlans = [];
            else    
                formattedOwnedPlans = [].concat.apply([], Object.values(action.payload.ownedPlans).map(Object.values));
            var formattedCollabForPlans;
            if (action.payload.collabForPlans === undefined)
                formattedCollabForPlans = [];
            else
                formattedCollabForPlans = [].concat.apply([], Object.values(action.payload.collabForPlans).map(Object.values));
            return {...state, fullName:action.payload.fullName, ownedPlans: formattedOwnedPlans, collabForPlans: formattedCollabForPlans}
        case PLANS_LOAD:
            return {...state, plans: {...state.plans, [action.payload.planId]: action.payload.planData} }
        case CUSTOM_ACTIVITIES_LOAD:
            return {...state, customActivities:action.payload}
        default:
            return state;
    }
};
