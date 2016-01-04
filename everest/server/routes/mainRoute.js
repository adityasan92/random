'use strict';

var nodeManager = require('../controllers/nodeManagement.controller.js');

module.exports = function(app){

  //Mercury node process information routes
  app.get('/getNodeProcess', nodeManager.getNodeProcess);
};
