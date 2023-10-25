const { Schema, Types, model } = require("mongoose");

const chatModel = new Schema({
    chatName: {
        type: String,
        trim: true
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    lastestMessage: {
        type: Types.ObjectId,
        ref: 'Message'
    },
    groupAdmin: {
        type: Types.ObjectId,
        red: 'User'
    }
})
module.exports = model('Chat', chatModel)