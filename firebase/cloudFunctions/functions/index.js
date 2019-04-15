const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addCollabEmail = functions.https.onCall((data, context) => {
    // Check that the user is okie dokie (that they have permission to share this plan)
    const uid = context.auth.uid;
    return admin.database().ref('plans/' + data.planId).once('value')
    .then((snapshot) => {
        if (snapshot.val().owner === uid)
            return userValidatedEmail(data.planId, data.collabEmail);
        else
            return { success: false };
    })
})

// Since the user is validated we can now share the plan
function userValidatedEmail(planId, collabEmail) {
    return admin.auth().getUserByEmail(collabEmail)
    .then(userRecord => {
        return addCollabToPlan(planId, userRecord.uid);
    })
}

function addCollabToPlan(planId, collabUid) {
    return admin.database().ref('plans/' + planId + '/collaborators/' + collabUid).set({
        access: 'true'
    }).then(() => {
        return addPlanToCollab(planId, collabUid);
    })
}

function addPlanToCollab(planId, collabUid) {
    return admin.database().ref('users/' + collabUid + '/collabForPlans').push({
        planId
      }).then(() => {
          return { success: true };
      })
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
