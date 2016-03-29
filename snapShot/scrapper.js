var Scraper = require('image-scraper');
var scraper = new Scraper('https://www.technologyreview.com/s/601100/genome-discovery-holds-key-to-designer-organisms/#/set/id/601109');

scraper.scrape(function(image) {
    image.save();
});
