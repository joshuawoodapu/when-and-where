import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PlanReducer from './PlanReducer';

export default combineReducers({
    user: UserReducer,
    plan: PlanReducer
});
