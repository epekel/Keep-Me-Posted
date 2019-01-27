<<<<<<< HEAD
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

=======
const env = process.env;

const firebase = require('firebase');
const twilio = require('twilio')(env.twilioSid, env.twilioAuth);
const lib = require('lib')({token: env.STDLIB_LIBRARY_TOKEN});
>>>>>>> cf0e5f93710ace0933e36c6361be0d53dc4827ab

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
<<<<<<< HEAD
module.exports = async (phoneNumber, keyword, context) => {
   let usersRef = await db.collection('users').doc(phoneNumber);
   let data = {
     phoneNumber: phoneNumber,
     location: location
=======
module.exports = async (name, context) => {
    let usersRef = db.collection('users').doc('+17789879001');
    let data = {
     phoneNumber: '+17789879001',
     location: 'Vancouver'
>>>>>>> cf0e5f93710ace0933e36c6361be0d53dc4827ab
   }

   return setDoc = usersRef.set(data);

  };
