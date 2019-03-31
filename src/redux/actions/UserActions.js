import firebase from 'firebase';
import {
    USER_LOAD,
    PLANS_LOAD,
    CUSTOM_ACTIVITIES_LOAD
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

export const plansLoad = (user) => {
    return (dispatch) => {
        firebase.database().ref('plans/').once('value')
        .then(snapshot => plansDataSuccess(dispatch, snapshot))
        .catch((error) => {
            console.log(error)
        })
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
    dispatch({
        type: USER_LOAD,
        payload: fullName
    })
};

const plansDataSuccess = (dispatch, snapshot) => {
    var plansData = snapshot.val();
    dispatch({
        type: PLANS_LOAD,
        payload: plansData
    })
};

const customActivitiesDataSuccess = (dispatch, snapshot) => {
    var customActivitiesData = snapshot.val();
    console.log(customActivitiesData);
    dispatch({
        type: CUSTOM_ACTIVITIES_LOAD,
        payload: customActivitiesData
    })
};