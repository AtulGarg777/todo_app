let mongoose=require('mongoose');
const { TodoSchema } = require('../Schema/TodoSchema');

let TodosModel=mongoose.model('Todos',TodoSchema);

module.exports={TodosModel}