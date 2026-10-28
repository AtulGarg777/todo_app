let mongoose = require('mongoose');

let LogsSchema = new mongoose.Schema({
    mylog: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId }
})

module.exports = { LogsSchema };