// self invoking function that is call by your self function

// client side
(function connect(){
    // when user join to this server that show in console
    let socket = io.connect("http://localhost:3000");

    // get by id
    let username = document.querySelector('#username');
    let usernameBtn = document.querySelector('#usernameBtn');
    let currentUsername = document.querySelector('.card-header')

    // get username value
    usernameBtn.addEventListener('click', (e)=>{
        console.log(username.value);
        
        // send username to server and set username
        // emit to get
        socket.emit("change_username", {username : username.value});
        currentUsername.textContent = username.value;
        username.value = "";
    })

    // get message and show
    let message = document.querySelector("#message");
    let messageBth = document.querySelector("#messageBtn");
    let messageList = document.querySelector('#message-list');

    // gte message
    messageBth.addEventListener('click', (e)=>{
        console.log(message.value);
        
        // send message to server
        socket.emit("new_message", {message : message.value});
        message.value =  "";
    })

    // get message from server to use 
    socket.on("receive_message", (data)=>{
        // show data on console browser
        console.log(data);

        // set message to show
        let listItem = document.createElement('li');
        listItem.textContent = `${data.username} : ${data.message}`;
        listItem.classList.add('list-group-item');
        messageList.appendChild(listItem);
    })

    // show when we will typing
    let info = document.querySelector('.info');
    
    message.addEventListener('keypress', (e)=>{
        // get when typing
        socket.emit('typing')
    })

    socket.on('typing', (data)=>{
        info.textContent = data.username + " is typing..."
        // when 5s that clear value
        setTimeout(()=>{ info.textContent = ''}, 5000)
    })
})();