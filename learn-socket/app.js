const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

/* 
event in server side {
    Connect 
    Message
    Disconnect
    Reconnnect
    Ping 
    Join and
    Leave 
}
*/

// when user connect that detect 
// this function to send server to client
io.on('connection', (socket)=>{
    console.log("User Connnected");

    // after 4 second send data to client
    setTimeout(()=>{
        socket.send("Send message after 4 second")
    }, 4000)

    // emit to client
    // emit will send by object
    setTimeout(()=>{
        socket.emit('test-event', {
            description : "A custom event name test-event"
        })
    }, 4000)

    // if user left 
    socket.on('disconnect', ()=>{
        console.log("User Disconnected");
    })
})

// this function just to get data from client
io.on('connection', (socket)=>{
    socket.on('client-event', (data)=>{
        console.log(data);
    })
})

// boardcasting connect to all client and send to them
// number of client
let client = 0;
io.on('connection', (socket)=>{

    // when client join
    // welcome for new client
    client++;
    socket.emit('new-client', {
        description : 'Hey, Welcome'
    })
    socket.broadcast.emit('new-client', {
        description : client + 'clients connected'
    })
    // when client left
    socket.on('disconnect', ()=>{
        client--;
        socket.broadcast.emit('new-client', {
            description : client + ' client connected'
        })
    })
    

    // show all number clients join 
    io.sockets.emit('broadcast', {
        description : client + ' client connected'
    })
    // when client left
    socket.on('disconnect', ()=>{
        client--;
        io.sockets.emit('broadcast', {
            description : client + ' client connected'
        })
    })


    // Namespace to set range of the path
    let nsp = io.of('/my-namespace');
    nsp.on('connection', (socket)=>{
        console.log("Someone connect");
        nsp.emit('hi', 'Hello everyone')
    })


    // Rooms error
    // let roomNo = 1;
    // if(
    //     io.nsps["/"].adapter.rooms['room-' + roomNo] &&
    //     io.nsps["/"].adapter.rooms['room-' + roomNo].length > 1
    // ) roomNo++;

    // socket.join("room-" + roomNo);

    // io.sockets.in("rooms-" + roomNo).emit("connectToRoom", "You are in room no." + roomNo);
})

http.listen(3000, ()=>{
    console.log("Server runing on port 3000");
})