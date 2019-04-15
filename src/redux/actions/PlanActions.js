import firebase from 'firebase';
import {
    PLAN_SET,
    NEW_ACTIVITY_SLOT,
    NEW_ACTIVITY_TO_EXISTING_SLOT
} from './types';

export const addActivityToExistingSlot = (planId, activityId, custom, slotIndex) => {
    return (dispatch) => {
        var planRef = firebase.database().ref('plans/' + planId + '/activitySlots' + '/slot' + slotIndex + '/activities')
        planRef.transaction(function(currentData) {
            // console.log(currentData);
            if (currentData === null) {
                return { activity0: { custom: custom, activityId: activityId } };
            }
            else {
                // Get an array of strings correlating to the names of each slot
                var activitiesArray = Object.keys(currentData);
                console.log("Activities Array: " + activitiesArray);
                // Get the last slot
                var lastActivity = activitiesArray[activitiesArray.length - 1];
                // Get the number of that last slot
                var lastActivityNum = Number(lastActivity.slice(8));
                // console.log(lastActivityNum);
                // Only 5 slots are supported
                if (lastActivityNum < 5) {
                    // Now we will push to database, the next slot
                    var nextActivity = "activity" + String(lastActivityNum + 1);
                    return {...currentData, [nextActivity]: { custom: custom, activityId: activityId } };
                }
                else {
                    console.log("Activity Slots with more than 5 activities are not supported at this time!!");
                    // #TODO: Show something to the user to explain why the slot doesn't add
                    return;
                }

            }
        },  function(error, committed, snapshot) {
            if (error) {
              console.log("Transaction failed abnormally!", error);
            } else {
              console.log("Activity pushed");
              addActivityToExistingSlotSuccess(dispatch, snapshot)
            }
        });
    };
};

export const planSet = (planId) => {
    console.log(planId)
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
            // console.log(currentData);
            if (currentData === null) {
                return { slot0: { activities: { activity0: { custom: custom, activityId: activityId } } } };
            }
            else {
                // Get an array of strings correlating to the names of each slot
                var slotsArray = Object.keys(currentData);
                // Get the last slot
                var lastSlot = slotsArray[slotsArray.length - 1];
                // Get the number of that last slot
                var lastSlotNum = Number(lastSlot.slice(4));
                // Only 5 slots are supported
                if (lastSlotNum < 5) {
                    // Now we will push to database, the next slot
                    var nextSlot = "slot" + String(lastSlotNum + 1);
                    return {...currentData, [nextSlot]: { activities: { activity0: { custom: custom, activityId: activityId } } } };
                }
                else {
                    console.log("Plans with more than 5 activity slots are not supported at this time!!");
                    // #TODO: Show something to the user to explain why the slot doesn't add
                    return;
                }

            }
        },  function(error, committed, snapshot) {
            if (error) {
              console.log("Transaction failed abnormally!", error);
            } else {
              console.log("Slot pushed");
              addActivitySlotSuccess(dispatch, snapshot)
            }
        });
    };
};

const planDataSuccess = (dispatch, snapshot, planId) => {
    planData = {...snapshot.val(), planId: planId}
    dispatch({
        type: PLAN_SET,
        payload: planData
    })
}

const addActivitySlotSuccess = (dispatch, snapshot) => {
    dispatch({
        type: NEW_ACTIVITY_SLOT,
        payload: snapshot.val()
    })
}

const addActivityToExistingSlotSuccess = (dispatch, snapshot) => {
    dispatch({
        type: NEW_ACTIVITY_TO_EXISTING_SLOT,
        payload: snapshot.val()
    })
}
