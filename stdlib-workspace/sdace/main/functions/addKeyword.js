const env = process.env;

const firebase = require('firebase');
const twilio = require('twilio')(env.twilioSid, env.twilioAuth);
const lib = require('lib')({token: env.STDLIB_LIBRARY_TOKEN});

firebase.initializeApp({
    apiKey: env.firebaseApiKey,
    authDomain: env.firebaseAuthDomain,
    databaseURL: env.firebaseDatabaseURL,
    projectId: env.firebaseProjectId,
    storageBucket: env.firebaseStorageBucket,
    messagingSenderId: env.firebaseMessagingSenderId
}, 'eventsApp');

const app = firebase.app("eventsApp");
const db = firebase.firestore(app);

/**
 * @param {string} name
 */
module.exports = async (name, context) => {
    let usersRef = db.collection('users').doc('+17789879001');
    let data = {
     phoneNumber: '+17789879001',
     location: 'Vancouver'
   }

   var setDoc = usersRef.set(data);
   return setDoc;
  };
