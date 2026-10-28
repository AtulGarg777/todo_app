const mongoose=require('mongoose');

let UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Todos'
    }],
    allLogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Logs'
    }]
})

module.exports={UserSchema}