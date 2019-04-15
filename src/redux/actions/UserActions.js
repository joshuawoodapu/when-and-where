import firebase from 'firebase';
import {
    USER_LOAD,
    PLANS_LOAD,
    CUSTOM_ACTIVITIES_LOAD,
    LOG_OUT
} from './types';

export const userLoad = (user) => {
    return (dispatch) => {
        firebase.database().ref('users/' + user.uid).once('value')
          .then(snapshot => userDataSuccess(dispatch, snapshot))
          .catch((error) => {
              console.log(error)
          })
    };
};

export const logOut = () => {
    return {
        type: LOG_OUT
    }
}

/*
export const newPlanInUser = (user, newPlan) => {
    return (dispatch) => {
        firebase.database().ref('users/' + user.uid + '/ownedPlans').push()
    }
}
*/

export const plansLoad = (ownedPlans, collabForPlans) => {
    console.log(collabForPlans);
    var allPlans = ownedPlans.concat(collabForPlans);
    return (dispatch) => {
        return Promise.all(allPlans.map(function(planId){
            firebase.database().ref('plans/' + planId).once('value')
            .then(snapshot => plansDataSuccess(dispatch, snapshot, planId))
            .catch((error) => {
                console.log(error)
            })
        }));
    };
};

export const customActivitiesLoad = (user) => {
    return (dispatch) => {
        firebase.database().ref('activities/').once('value')
        .then(snapshot => customActivitiesDataSuccess(dispatch, snapshot))
        .catch((error) => {
            console.log(error)
        })
    };
};

const userDataSuccess = (dispatch, snapshot) => {
    var fullName = (snapshot.val() && snapshot.val().fullName) || 'Jane Doe';
    var ownedPlans = snapshot.val().ownedPlans;
    var collabForPlans = snapshot.val().collabForPlans;
    dispatch({
        type: USER_LOAD,
        payload: {fullName: fullName, ownedPlans, collabForPlans}
    })
};

const plansDataSuccess = (dispatch, snapshot, planId) => {
    var plansData = {planData: snapshot.val(), planId};
    dispatch({
        type: PLANS_LOAD,
        payload: plansData
    })
};

const customActivitiesDataSuccess = (dispatch, snapshot) => {
    var customActivitiesData = snapshot.val();
    dispatch({
        type: CUSTOM_ACTIVITIES_LOAD,
        payload: customActivitiesData
    })
};