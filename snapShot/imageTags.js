var http = require("http");
var querystring = require('querystring');
var request = require('request');

var url = "";

// var postData = querystring.stringify({
//   'url' : 'http://s3.favim.com/orig/42/-animal-animals-cute-dog-Favim.com-361124.jpg'
// });

var headers = {
  'Content-Type': 'application/json',
  'Ocp-Apim-Subscription-Key': 'f96067f350d64ec8b0834a481edde6bd'
};

// var options = {
//   hostname: 'https://api.projectoxford.ai/',
//   path: 'vision/v1.0/analyze?visualFeatures=Tags',
//   method: 'POST',
//   headers: headers
// }

// var req = http.request(options, (res) => {
//   console.log(`STATUS: ${res.statusCode}`);
//   console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//   res.setEncoding('utf8');
//   res.on('data', (chunk) => {
//     console.log(`BODY: ${chunk}`);
//   });
//   res.on('end', () => {
//     console.log('No more data in response.')
//   })
// });
//
// // write data to request body
// req.write(postData);
// req.end();


var options = {
  uri: 'https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Tags',
  method: 'POST',
  json: {
    "url": "http://3.bp.blogspot.com/-6ZtzhW3hh84/T1wy52TiQLI/AAAAAAAABy8/ToFk2k_nCLU/s1600/cute-baby-animal-backgrounds+3.jpg"
  },
  headers:headers
};
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body.id) // Print the shortened url.
  }
  console.log(body);
});
