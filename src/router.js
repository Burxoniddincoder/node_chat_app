const chatsRouter = require('./routers/chats.router');
const messageRouter = require('./routers/message.router');
const userRouter = require('./routers/user.router');

module.exports = require('express').Router()
    .use('/user', userRouter)
    .use('/message', messageRouter)
    .use('/chat', chatsRouter)