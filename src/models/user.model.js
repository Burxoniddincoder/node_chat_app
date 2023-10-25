const { Schema, model } = require("mongoose");

const userModel = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    username: {
        type: String,
        unique: true,
    },
    banned: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    hidden: {
        type: Boolean,
        default: false
    }
})
module.exports = model('User', userModel)