let env = process.env;

const firebase = require('firebase');
const accountSid = 'AC589a7c5aa857b895a017995a24931d30';
const authToken = 'd89fde45b1049ea1590ca3efab6ed7a9';
const twilio = require('twilio')(accountSid, authToken);
const lib = require('lib')({token: env.STDLIB_LIBRARY_TOKEN});
const sms = lib.utils.sms['@1.0.9'];

const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const express_app = express();


firebase.initializeApp({
    apiKey: env.firebaseApiKey,
    authDomain: env.firebaseAuthDomain,
    databaseURL: env.firebaseDatabaseURL,
    projectId: env.firebaseProjectId,
    storageBucket: env.firebaseStorageBucket,
    messagingSenderId: env.firebaseMessagingSenderId
}, 'eventsApp');

let app = firebase.app("eventsApp");
let db = firebase.firestore(app);

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
