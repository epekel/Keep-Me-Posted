let env = process.env

const firebase = require('firebase')
const twilio = require('twilio')(env.twilioSid, env.twilioAuth)
const lib = require('lib')

firebase.initializeApp({
    apiKey: env.firebaseApiKey,
    authDomain: env.firebaseAuthDomain,
    databaseURL: env.firebaseDatabaseURL,
    storageBucket: env.firebaseStorageBucket,
    messagingSenderId: env.firebaseMessagingSenderId
}, 'eventsApp');

let app = firebase.app('eventsApp');
let database = firebase.database(app);

/**
 * @param {string} name
 */
module.exports = async (name, context) => {
    return name;
  };
