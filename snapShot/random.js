var read = require('node-readability');

read('https://www.technologyreview.com/s/600986/ai-hits-the-mainstream/#/set/id/601112/',
function(err, article, meta) {
  var dom = article.document;
  var html = '<html><head><meta charset="utf-8"><title>'+dom.title+'</title></head><body><h1>'+article.title+'</h1>'+article.content+'</body></html>';
  //console.log(html);
  //console.log(meta);
  console.log(article.content);
  var fs = require('fs');
  fs.writeFile("test.html", html, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  });
});
