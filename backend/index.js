const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

let express = require('express');
const mongoose = require('mongoose');
let app = express();
let cors=require("cors");
require('dotenv').config()
let Todos=require('./Routes/Todos')
let User=require('./Routes/User')


let port = 8000;

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
}))

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log("mongo db connection succesful");
}).catch((err) => {
    console.log("mongoose connection failed: ", err);
})

app.get('/',(req,res)=>{
    res.json({data:"hello"})
})

app.use('/todos',Todos)
app.use('/user',User)

app.listen(port, () => {
    console.log(`server running on ${port}`);
})