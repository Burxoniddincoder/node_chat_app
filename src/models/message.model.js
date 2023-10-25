const { Schema, Types, model } = require("mongoose");

const messageModel = new Schema({
    sender: {
        type: Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: Types.ObjectId,
        ref: 'Chat'
    },
    hidden: {
        type: Boolean,
        default: false
    }
})
module.exports = model('Message', messageModel)