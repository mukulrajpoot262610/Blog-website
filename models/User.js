const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now()
    },
    avatar: {
        type: String
    }

})

module.exports = mongoose.model('user', UserSchema)