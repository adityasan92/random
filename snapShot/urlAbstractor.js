function breakDownURL(url) {
    var domain = "";

    if (url.indexOf("http://") == 0) {
        url = url.substr(7);
    }

    if (url.indexOf("https://") == 0) {
        url = url.substr(8);
    }
    //remove "www."
    if (url.indexOf("www.") == 0) {
        url = url.substr(4);
    }
    domain = url.split('/')[0].split('.')[0];
    console.log(domain);
}

//var url = "https://console.aws.amazon.com/s3/home?region=us-west-2#&bucket=photonworld&prefix=";
//var url = "ariya.github.io/svg/tiger.svg";
var urls =  [
  "www.w3schools.com/html/tryit.asp?filename=tryhtml_images_size",
  "https://console.aws.amazon.com/s3/home?region=us-west-2#&bucket=photonworld&prefix=",
  "ariya.github.io/svg/tiger.svg"
]
//breakDownURL(url);


for (x in urls) {
    var a = document.createElement('a');
    a.href = urls[x];
    console.log(a.hostname);
}

// var r = /:\/\/(.[^/]+)/;
// console.log(url.match(r));
// var value = url.match(r)[1];
// console.log(value);
