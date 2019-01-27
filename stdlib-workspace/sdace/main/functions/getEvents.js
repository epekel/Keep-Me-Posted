let http = require('http');
let querystring = require('querystring');
// need to npm install
let xml2js = require('xml2js');

const EVENTFUL_HOST = "api.eventful.com"
const EVENTFUL_GET_ENDPOINT = "/rest/events/search?";
const EVENTFUL_APP_KEY = process.env.EVENTFUL_APP_KEY;

let responses = {};

/**
 * Function to search for events from the Eventful API
 * @param {Array} keywords - array of keywords to search for 
 * @param {string} location - the location to look for
 */
let searchEvents = function (keywords, location) {
    let requestUrls = [];
    for (let i = 0; i < keywords.length; i++) {
        let query = querystring.stringify({
            app_key: EVENTFUL_APP_KEY,
            keywords: keywords[i],
            location: location,
        });
        requestUrls.push(EVENTFUL_GET_ENDPOINT + query);
        console.log(requestUrls[i]);

        sendGetRequest(requestUrls[i], keywords[i].trim());
    }

    //console.log(responses);
    //return responses;
}

let sendGetRequest = function (path, keywordId) {
    return http.get({
            host: EVENTFUL_HOST,
            path: path,
        }, function(response) {
            // Continuously update stream with data
            let body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                // Data received, let us parse it using XML!
                //console.log(body);
                let res = xml2js.parseString(body, function (err, result) {
                    responses[keywordId] = result;
                });
                console.log(responses);
            });
    });
}

/**
 * @param {string} number
 */
module.exports = async (number, context) => {

}
