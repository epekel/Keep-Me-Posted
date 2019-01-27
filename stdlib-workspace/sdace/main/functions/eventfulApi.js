var http = require('http');
var querystring = require('querystring');
// need to npm install
var xml2js = require('xml2js');

const EVENTFUL_HOST = "api.eventful.com"
const EVENTFUL_GET_ENDPOINT = "/rest/events/search?";
const EVENTFUL_APP_KEY = "FbmS52x99dWHqr8D";

var responses = {};

/**
 * Function to search for events from the Eventful API
 * @param {Array} keywords - array of keywords to search for 
 * @param {string} location - the location to look for
 */
var searchEvents = async function (keywords, location) {
    var searchPromise = await sendGetRequests(keywords, location);

    // get the result of the response analysis
    var result = analyzeResponses(responses) 

    //console.log(responses);
    console.log(result);
    return result;
};

var sendGetRequests = function (keywords, location) {
    return new Promise(function (resolve, reject) { 
        var requestUrls = [];
        var promises = [];
        numKeywords = keywords.length;
        for (var i = 0; i < numKeywords; i++) {
            var query = querystring.stringify({
                app_key: EVENTFUL_APP_KEY,
                keywords: keywords[i],
                location: location,
            });
            requestUrls.push(EVENTFUL_GET_ENDPOINT + query);
            console.log(requestUrls[i]);

            var promise = sendGetRequest(requestUrls[i], keywords[i].trim());
            promises.push(promise);
        }

        var promiseAll = Promise.all(promises);
        promiseAll.then(function(values) {
            resolve(values);
        });
    });
}

/**
 * Helper function to send a get request to Eventful API
 * @param {string} path - path for the search query
 * @param {string} keywordId - keyword for which the get request is being sent for
 */
var sendGetRequest = function (path, keywordId) {
    return new Promise(function (resolve, reject) {
        http.get({
            host: EVENTFUL_HOST,
            path: path,
        }, function(response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                // Data received, let us parse it using XML!
                //console.log(body);
                var res = xml2js.parseString(body, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    responses[keywordId] = result;
                    resolve(result);
                });
                console.log(responses);
            });
        });
    });
};

var analyzeResponses = function (responses) {
    var responsesKeys = Object.keys(responses);
    var numResponses = responsesKeys.length;
    if (numResponses <= 0) {
        return {};
    }

    var result = {
        /*<keyword>: {
            title: "",
            date: "",
            performerName: "",
            url: "",
        },*/
    };

    for (var i = 0; i < numResponses; i++) {
        var keyword = responsesKeys[i];
        var searchResults = responses[keyword].search;
        if (searchResults["total_items"] > 0) {
            for (var j = 0; j < searchResults.events[0].event.length; j++) {
                var event = searchResults.events[0].event[j];
                console.log(event);
                console.log(event.performers);
                result[keyword] = {
                    title: event.title,
                    date: event["start_time"],
                    performerName: event.performers != undefined ? event.performers[0].performer[0].name : "",
                    url: event.url,
                }
                // for now, assume first result is the best
                break;
            }
        }
    }

    return result;
};

var concertSearch = searchEvents(["Justin Timberlake", "Carrie Underwood"], "Vancouver");