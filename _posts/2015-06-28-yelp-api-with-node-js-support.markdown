---
layout: blogbase
title: Yelp API(v2) with node.js support--handling of authentication
category: development
tag: programming, development, Yelp, node, oauth,
---

What is Yelp? Well, to me is just TripAdviser just with better APIs, although the official introduction goes like this:

<blockquote>
  <h2>
    Yelp is the best way to find great local businesses
  </h2>
  <p>
    People use Yelp to search for everything from the city's tastiest burger to the most renowned cardiologist. What will you uncover in your neighborhood?
  </p>
</blockquote>

For one of my Hackathon project we planned to use Yelp API to query local businesses. Well, I do believe that the API is really useful in a sense that the searching results are good in form. However, the only problem I am facing as the back-end guy for that project is to enable node to talk to Yelp API server. Given the fact that [Yelp API GitHub repo](https://github.com/Yelp/yelp-api/tree/master/v2) actually contains quite some working samples written in Python/Java/Obj-C and etc, it should not be hard to talk to their API server. Well, they recommend to use one npm package [node-yelp](https://github.com/olalonde/node-yelp). I tried but unluckily the response is error: "One or more parameter is missing: oauth_consumer_key". Clearly this is a bug with the library as the response contains error even if I run the example code.

So I thought anyway, it should be a big deal--I can just add that "missing" parameter in the url as GET parameter(Well, consumer key is not confidential anyway, consumer secret is). But the error changed to some other parameter missing. So in the end I put everything reported missing to the url(for nonce, signature and timestamp, I actually read the node-oauth library node to generate those). But in the end I got signature invalid error.

Well, this is not pleasant and just before I gave up trying, I found a blog post about this issue [How to use Yelp's API with Node](https://arian.io/how-to-use-yelps-api-with-node/). In side this post, the author is using oauth-signature, which is only for Oauth 1.0a(the one used by Yelp API v2) and appended all required parameters to url. I copied the code and it works. Then I went ahead and refactored a bit of it.

```javascript
/* require the modules needed */
var oauthSignature = require('oauth-signature');  
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('lodash');

var base_url = 'http://api.yelp.com/v2/';

var yelpConsumerKey = '<YOUR CONSUMER KEY>';
var yelpConsumerSecret = '<YOUR CONSUMER SECRET>';
var yelpToken = '<YOUR TOKEN>';
var yelpTokenSecret = '<YOUR TOKEN SECRET>';

/* Function for yelp search call
 * ------------------------
 * params: object with params to search
 * callback: callback(error, response, body)
 */
module.exports.search = function (params, callback) {
  var httpMethod = 'GET';
  var url = base_url + 'search';

  makeRequestToYelp(httpMethod, url, params, callback);
};

/* Function for yelp business call
 * ------------------------
 * businessId: yelp businessId
 * params: object with params for API
 * callback: callback(error, response, body)
 */
module.exports.getBusiness = function (businessId, params, callback) {
  var httpMethod = 'GET';
  var url = base_url + 'business/' + businessId;

  makeRequestToYelp(httpMethod, url, params, callback);
};

function makeRequestToYelp(method, apiUrl, params, callback) {
  var required_params = {
    oauth_consumer_key : yelpConsumerKey,
    oauth_token : yelpToken,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };
  var parameters = _.assign(params, required_params);
  var consumerSecret = yelpConsumerSecret;
  var tokenSecret = yelpTokenSecret;
  var signature = oauthSignature.generate(method, apiUrl, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);
  var apiURL = apiUrl + '?' + paramURL;

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });
}
```

(There is more about Oauth 1.0a if you want to explore of course, but basically the idea is to generate base string from URL and parameters + token secret and consumer secret for server to verify.)

Have fun with coding and coding with node :P
