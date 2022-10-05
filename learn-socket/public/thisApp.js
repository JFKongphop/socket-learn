/* 
event in client side {
    Connect 
    Connect_error
    Connect_timeout
    Reconnect, etc
}
*/

(()=>{
    const socket = io()

    // get data to show from server to client
    socket.on('message', (data)=>{
        document.write(data);
    })

    socket.on('test-event', (data)=>{
        document.write(data.description)
    })

    // send data from client to server
    socket.emit('client-event', 'Send an event from client')


    // show number of client and send to all client
    const number = document.querySelector('.number')
    // initial
    // get data from boardcast
    socket.on('broadcast', (data)=>{
        number.innerHTML = `${data.description}`
    })

    // new test
    socket.on('new-client', (data)=>{
        number.innerHTML = `${data.description}`
    })

    // namespace to set range of the path
    const socketNew = io('/my-namespace')
    const nameSpace = document.querySelector('.nameSpace');
    socketNew.on('hi', (data)=>{
        nameSpace.innerHTML = `${data}`
    })


    // Rooms
    // const socket = io()
    // const nameSpace = document.querySelector('.nameSpace');
    // socket.on('connectToRoom', (data)=>{
    //     nameSpace.innerHTML = `${data}`
    // })


})();