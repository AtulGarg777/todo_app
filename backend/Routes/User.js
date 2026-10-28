const { logsModel } = require('../Models/LogsModel');
const { TodosModel } = require('../Models/TodosModel');
const { UserModel } = require('../Models/UserModel');

let router = require('express').Router()

router.patch('/:username', async (req, res) => {
    try {
        let { username } = req.params;
        let { editInd, inpValue } = req.body;

        if (!username && (editInd == null || editInd < 0) && !inpValue) {
            res.json({ msg: 'username, editInd and inpvalue are required' })
            return
        }

        let user = await UserModel.findOne({ username }).populate("todos");
        let editObj = user.todos.find((v, i, arr) => i == editInd)

        let editoObj_id = editObj._id;

        await TodosModel.findByIdAndUpdate(editoObj_id, { todo: inpValue })

        //creating log what user did
        let newLog = await logsModel.create({ mylog: `user: ${username} edit ${editObj.todo} to ${inpValue}`, userId: user._id })

        await UserModel.updateOne({ username: username }, { $push: { "allLogs": newLog._id } })

        res.json({ msg: "user updated successfully", success: true, user })
    }
    catch (err) {
        res.status(500).json({ msg: 'error in updating todo value', success: false, err: err })
    }
})


router.delete('/', async (req, res) => {
    try {
        let { username, todo } = req.body;

        if (!username && !todo) {
            res.json({ msg: 'username and todo name required', success: false })
            return
        }

        let user = await UserModel.findOne({ username }).populate("todos");
        let user_id = user._id
        let todoObj = user.todos.find((elem) => elem.todo == todo)

        await UserModel.updateOne({ _id: user_id }, { $pull: { "todos": todoObj._id } })

        await TodosModel.findByIdAndDelete({ _id: todoObj._id })

        //creating log that user delete this todo
        let newLog = await logsModel.create({ mylog: `user: ${username} delete ${todo}`, userId: user._id })
        await UserModel.updateOne({ username: username }, { $push: { "allLogs": newLog._id } })

        res.json({ user, success: true, msg: 'todo deleted successfully' })
    } catch (err) {
        res.status(500).json({ msg: "error occurend in deleting todo from /users/ (delete)", success: false, err })
    }
})

router.post('/:username', async (req, res) => {

    let { username } = req.params;

    if (!username) {
        res.json({ success: false, msg: 'user name required' })
        return
    }

    let user = await UserModel.findOne({ username }).populate('todos', 'todo -_id');


    if (!user) {
        let user = await UserModel.create({ username })

        //creating log that signup
        let newLog = await logsModel.create({ mylog: `user: ${username} signup successfully`, userId: user._id })
        await UserModel.updateOne({ username: username }, { $push: { "allLogs": newLog._id } })

        res.json({ msg: 'user created successfully', success: true, user })
        return
    }

    //creating log that login
        let newLog = await logsModel.create({ mylog: `user: ${username} login successfully`, userId: user._id })
        await UserModel.updateOne({ username: username }, { $push: { "allLogs": newLog._id } })

    //below statement work for get request
    res.json({ msg: "user already exist", success: true, user })
})

module.exports = router