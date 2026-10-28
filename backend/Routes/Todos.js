const router = require('express').Router();
let { UserModel } = require("../Models/UserModel")
let { TodosModel } = require('../Models/TodosModel');

router.get('/:username', async (req, res) => {
    let { username } = req.params;
    let user = await UserModel.find({ username })

    // if(!username){
    //     //create user
    //     res.status().json({success:false,msg:'username not found'})
    // }

    res.json({ success: true, msg: "user already exist", user })
})

router.post('/addtodo', async (req, res) => {
    try {
        let { inpValue, username } = req.body;

        if (inpValue?.trim() == "") {
            res.json({ msg: 'todo item is empty', success: false })
        }

        if (!username) {
            res.json({ msg: 'user name required', success: false })
        }

        let result = await TodosModel.create({ todo: inpValue })

        await UserModel.findOneAndUpdate({ username }, { $push: { todos: result._id } })

        //creating log that user create a todo
        let newLog = await logsModel.create({ mylog: `user: ${username} create ${inpValue}`, userId: user._id })
        await UserModel.updateOne({ username: username }, { $push: { "allLogs": newLog._id } })


        res.json({ result, success: true, msg: 'todo created' })
    }
    catch (err) {
        res.json({ msg: "todo creation error", success: false })
    }
})

module.exports = router;