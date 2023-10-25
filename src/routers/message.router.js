const messageController = require('../controllers/message.controller');

module.exports = require('express').Router()
    .post('/create', messageController.sendMessage)
    .get('/getall', messageController.allMessages)