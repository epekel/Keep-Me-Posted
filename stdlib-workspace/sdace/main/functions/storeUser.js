let env = process.env;

const firebase = require('firebase');
const twilio = require('twilio')(env.twilioSid, env.twilioAuth);
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
module.exports = async (phoneNumber, location, context) => {
   let usersRef = await db.collection('users').doc(phoneNumber);
   let data = {
     phoneNumber: phoneNumber,
     location: location
   }

   // let twilioPhoneNumber = phoneNumber;
   return setDoc = usersRef.set(data);
   // await twilio.messages
   //    .create({from: '+16042105759', body: 'Tell us your keywords', to: twilioPhoneNumber})
   //    .then(function(message) {
   //       console.log(message.sid);
   //    }).catch(function(error) {
   //        console.log("ERROR: " + JSON.stringify(error));
   //    });



    // express_app.use(bodyParser.urlencoded({ extended: false }));
    // express_app.post('https://demo.twilio.com/welcome/sms/', function(req, res) {
    //   var client = context.getTwilioClient();
    //   let twiml = new Twilio.twiml.MessagingResponse();
    //   console.log("Sending message")
    //   let body = req.Body ? req.Body.toLowerCase() : null;
    //   body = body.split(":")[0];
    //   switch (body) {
    //       case 'keywords':
    //             console.log("Sending events")
    //             let message = twiml.message();
    //             message.body("Here is your events");
    //             break;
    //       default:
    //             twiml.message(body);
    //             break;
    //     }
    //   });
    //
    //
    //
    //   http.createServer(express_app).listen(8000, () => {
    //     console.log('Express server listening on port 8000');
    //   });
  };
