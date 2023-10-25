require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const file = require('express-fileupload');
const folder = require('./src/helpers/folder');
const filee = require('./src/helpers/file');
const { APP_PORT, MONGO_URI } = require('./src/config/env')
const router = require('./src/router');
require('mongoose').connect(MONGO_URI);
app.use(cors());
app.use(file())
app.use(express.json())
app.use('/public', express.static('public'));
app.use('/api', router)
const server = app.listen(APP_PORT, console.log(`Server runnning ${APP_PORT}`))
const io = require('socket.io')(server, {
    pingTimeOut: 60000,
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on('connection', socket => {
    console.log('connected to socket');
    socket.on('setup', (userdata) => {
        socket.join(userdata?._id)
        socket.emit('connected')

        socket.on('join chat', (room) => {
            socket.join(room)
            console.log("User joined Room :" + room);
        });


        socket.on('typing', (room) => socket.in(room).emit('typing'));
        socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

        socket.on('newMessage', (newMessageRecived) => {
            var chat = newMessageRecived.chat;

            if (!chat.users) return console.log('chat.users not defined');

            chat.users.forEach(user => {
                if (user._id == newMessageRecived.sender._id) return;
                socket.in(user._id).emit('message recived', newMessageRecived)
            })
        })



        socket.off('setup', () => {
            console.log('User Disconnected');
            socket.leave(userdata._id)
        })

    });
})