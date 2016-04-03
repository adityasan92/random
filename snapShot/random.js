var read = require('node-readability');
var sanitizer = require("sanitizer");
var parse5 = require('parse5');

read('http://www.w3schools.com/jsref/jsref_search.asp',
function(err, article, meta) {
  var rawContent = article.content;
  var rawTitle = article.title;
  //var html = '<html><head><meta charset="utf-8"><title>'+dom.title+'</title></head><body><h1>'+article.title+'</h1>'+article.content+'</body></html>';
  console.log(rawContent);
  //console.log(meta);
  var imgTags  = [];
  imgTags = scrapeImage(article.content || "");
  var content = stripHTML(article.content || "");
  console.log(content);
  console.log(rawTitle);
  //var fs = require('fs');
  // fs.writeFile("test.html", html, function(err) {
  //     if(err) {
  //         return console.log(err);
  //     }
  //
  //     console.log("The file was saved!");
  // });
});

function scrapeImage(html){
    retun "";
}

function stripHTML(html) {
    var clean = sanitizer.sanitize(html, function (str) {
        return str;
    });
    // Remove all remaining HTML tags.
    clean = clean.replace(/<(?:.|\n)*?>/gm, "");

    // RegEx to remove needless newlines and whitespace.
    // See: http://stackoverflow.com/questions/816085/removing-redundant-line-breaks-with-regular-expressions
    clean = clean.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/ig, "\n");

    // Return the final string, minus any leading/trailing whitespace.
    return clean.trim();
}
