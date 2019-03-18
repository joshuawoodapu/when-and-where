import firebase from 'firebase';
import {
    PLAN_SET
} from './types';

export const planSet = (planID) => {
    return (dispatch) => {
        //dispatch({ type: PLAN_SET });
        console.log('plans/' + planID)
        firebase.database().ref('plans/' + planID).once('value')
          .then(snapshot => planDataSuccess(dispatch, snapshot))
          .catch((error) => {
              console.log(error)
          })
    };
};

const planDataSuccess = (dispatch, snapshot) => {
    console.log(snapshot.val());
    dispatch({
        type: PLAN_SET,
        payload: snapshot.val()
    })
}
