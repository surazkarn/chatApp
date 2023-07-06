const express = require('express')
const http = require('http');
const socketio = require('socket.io');

//create an express app object and pass it inside the create server function
const app = express()
const server = http.createServer(app);
const io = socketio(server);

//io.on expects an event i.e connection. Whenever from any two sides of the machine, if anyone emits a connection event then other person can listen to the connection event
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('msg_send', (data) => {
        console.log(data);
        //io.emit('msg_rcvd', data)
        //socket.emit('msg_rcvd', data)
        socket.broadcast.emit('msg_rcvd', data)
    })

   /* setInterval(() => {
        socket.emit('from_server')
    }, 2000)*/
})

app.use("/", express.static(__dirname + '/public'));

server.listen(3006,()=> {
    console.log('server started');
})