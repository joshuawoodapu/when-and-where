import firebase from 'firebase';
import {
    PLAN_SET,
    NEW_ACTIVITY_SLOT
} from './types';

export const planSet = (planId) => {
    return (dispatch) => {
        firebase.database().ref('plans/' + planId).once('value')
          .then(snapshot => planDataSuccess(dispatch, snapshot, planId))
          .catch((error) => {
              console.log(error)
          })
    };
};

// This action will push a new activity slot to the given plan, transaction allows us to conditionally 
// push data and will wait if the database ref is currently being edited 
// Pay attention to currentData being null as this shows different behavior for a empty ref vs one with 
// slots already established
export const addActivitySlot = (planId, activityId, custom) => {
    return (dispatch) => {
        var planRef = firebase.database().ref('plans/' + planId + '/activitySlots')
        planRef.transaction(function(currentData) {
            console.log(currentData);
            if (currentData === null) {
                return { slot0 : { activities: { activity0: { custom: custom, activityId: activityId } } } };
            }
            else {
                console.log(currentData)
                return;
            }
        },  function(error, committed, snapshot) {
            if (error) {
              console.log('Transaction failed abnormally!', error);
            } else {
              console.log('Slot pushed');
              addActivitySlotSuccess(dispatch, snapshot)
            }
        });          
    };
};

const planDataSuccess = (dispatch, snapshot, planId) => {
    console.log(snapshot.val());
    planData = {...snapshot.val(), planId: planId}
    dispatch({
        type: PLAN_SET,
        payload: planData
    })
}

const addActivitySlotSuccess = (dispatch, snapshot) => {
    console.log(snapshot.val());
    dispatch({
        type: NEW_ACTIVITY_SLOT,
        payload: snapshot.val()
    })
}
