const express = require('express');
const app = express();
const socketio = require('socket.io');

// read ejs with node
app.set("view engine", "ejs");

// use file in public
app.use(express.static("public"))

// home page
app.get('/', (req, res)=>{
    res.render("index");
})

const server = app.listen(3000, ()=>{
    console.log("server is running");
})

// create socket
// initialize socket for the server
const io = socketio(server);

io.on("connection", (socket)=>{
    console.log("New User connected");

    // set initial name = username
    socket.username = "Username"

    // get username from emit in chatroom
    // on to use
    socket.on("change_username", (data)=>{
        // change name from user
        socket.username = data.username
    })

    // handle new message
    socket.on("new_message", (data)=>{
        console.log("new message :", data.message);
        // get value to set
        io.sockets.emit("receive_message", { message : data.message, username : socket.username })
    })

    // tell server have typing
    socket.on('typing', (data)=>{
        // tell all that have some user typing
        socket.broadcast.emit('typing', { username : socket.username })
    })
});