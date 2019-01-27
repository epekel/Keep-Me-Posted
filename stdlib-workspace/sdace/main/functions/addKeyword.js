
let env = process.env;

const firebase = require('firebase');
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
 * @param {string} phoneNumber
 * @param {string} location
 */
module.exports = async (phoneNumber, keyword, context) => {
   let usersRef = await db.collection('users').doc(phoneNumber);
   let data = {
     phoneNumber: phoneNumber,
     location: location
   }

   return setDoc = usersRef.set(data);
  };
