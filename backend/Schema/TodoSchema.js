let mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
    }, todoHistory: [{
        type: String
    }]
})

module.exports = { TodoSchema }