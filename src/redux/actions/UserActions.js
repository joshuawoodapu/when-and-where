import firebase from 'firebase';
import {
    USER_LOAD,
    PLANS_LOAD
} from './types';

export const userLoad = (user) => {
    return (dispatch) => {
        //dispatch({ type: USER_LOAD });
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
    }
}

const userDataSuccess = (dispatch, snapshot) => {
    var fullName = (snapshot.val() && snapshot.val().fullName) || 'Jane Doe';
    dispatch({
        type: USER_LOAD,
        payload: fullName
    })
}

const plansDataSuccess = (dispatch, snapshot) => {
    var plansData = snapshot.val();
    dispatch({
        type: PLANS_LOAD,
        payload: plansData
    })
}