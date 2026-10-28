const mongoose = require('mongoose');
const { UserSchema } = require('../Schema/Userschema');

let UserModel = mongoose.model('User', UserSchema)

module.exports = { UserModel }