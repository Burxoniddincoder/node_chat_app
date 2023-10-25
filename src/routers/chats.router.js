const chatController = require('../controllers/chat.controller');

module.exports = require('express').Router()
    .get('/fetchChats', chatController.fetchChat)
    .post('/access', chatController.accessChat)
    .post('/create', chatController.createChat)
    .put('/edit:id', chatController.renameChat)
    .put('/group/add', chatController.addToGroup)
    .put('/group/remove', chatController.removeFromChat)
