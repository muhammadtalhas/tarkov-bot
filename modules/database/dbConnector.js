console.log("mongo connection initiated");

var mongoConnector = require('./mongoConnector.js');

module.exports = {
    mongoConnector: mongoConnector
};