const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addCollab = functions.https.onCall((data, context) => {
    // Check that the user is okie dokie (that they have permission to share this plan)
    const uid = context.auth.uid;
    ref = admin.database().ref('plans/' + data.planId);




    // Get the plan 

    // Get the user
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
