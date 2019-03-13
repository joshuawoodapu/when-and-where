import firebase from 'firebase';
import {
    USER_LOAD
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

const userDataSuccess = (dispatch, snapshot) => {
    var fullName = (snapshot.val() && snapshot.val().fullName) || 'Jane Doe';
    dispatch({
        type: USER_LOAD,
        payload: fullName
    })
}
