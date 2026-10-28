let mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
    todo:{
        type: String,
    }
})

module.exports={TodoSchema}