var readability  = require('node-readability'),
    sanitizer = require("sanitizer");

scraper("http://www.bloomberg.com/news/articles/2016-03-28/u-s-quake-forecast-includes-human-induced-temblors-for-first-time", function (data) {
  console.log("# %s #\n\n%s\n\n---", data.title, data.contents);
  //res.send(data);
});

function scraper(url, callback) {
    readability.read(url, function(err, doc) {
        if (err) {
            throw err;
        }

        var obj = {
            "url": url,
            "title": doc.title.trim(),
            "contents": stripHTML(doc.content || "")
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
