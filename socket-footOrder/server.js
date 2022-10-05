const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const socketIO = require('socket.io')
const cors = require('cors')
const path = require("path");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

const server = app.listen(3000, () => {
    console.log('server is running....')
})

app.get('/customer', (req, res)=> {
    res.sendFile(path.join(__dirname, "./customer.html"));
})

app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, "./shop.html"));
})

const io = socketIO(server)
io.on('connection', (socket) => {
    console.log('client socket connected')

    socket.on('order', (response) => {
        console.log(response)

        io.sockets.emit('shop', response)
    })
})