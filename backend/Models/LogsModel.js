let mongoose = require('mongoose');
const { LogsSchema } = require('../Schema/LogsSchema');

let logsModel = mongoose.model('Logs', LogsSchema);

module.exports = { logsModel };