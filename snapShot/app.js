var webshot = require('webshot');

var options = {

shotSize: {
    width: 'all',
    height: 'all'
  }
};

// var options = {
//   onLoadFinished: {
//     fn: function(status) {
//       var tags = document.getElementsByTagName(this.tagToReplace);
//
//       for (var i=0; i<tags.length; i++) {
//         var tag = tags[i];
//         tag.innerHTML = 'The loading status of this page is: ' + status;
//       }
//     }
//   , context: {tagToReplace: 'h1'}
//   }
// };

webshot('https://www.technologyreview.com/s/601100/genome-discovery-holds-key-to-designer-organisms/#/set/id/601109/', 'google.png', options, function(err) {
  // screenshot now saved to google.png
  console.log(err);
});
