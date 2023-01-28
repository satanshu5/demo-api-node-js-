// Composing the user Schema

const { timeStamp } = require('console')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema.Types
const userSchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    username : {
        type : String
    },
    password : {
        type : String
    },
    phone : {
        type : String
    },
    followers : [{type: ObjectId, ref : "User"}],
    following : [{type: ObjectId, ref : "User"}],
}, {timestamps : true})

const User = mongoose.model('User', userSchema)
module.exports = User