#!/usr/bin/env node

// 3rd party modules.
var readability = require("node-readability"),
    sanitizer = require("sanitizer");

scraper("https://www.technologyreview.com/s/600762/robot-art-raises-questions-about-human-creativity/#/set/id/600857/", function (data) {
    console.log("# %s #\n\n%s\n\n---", data.title, data.contents);
});

function scraper(url, callback) {
    readability.read(url, function(err, doc) {
        if (err) {
            throw err;
        }

        var obj = {
            "url": url,
            "title": doc.getTitle().trim(),
            "contents": stripHTML(doc.getContent() || "")
        };
        callback(obj);
    });
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
