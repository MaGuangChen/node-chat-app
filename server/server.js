const express = require('express');
const http = require('http') // 內建因為我們要自己用http
const path = require('path'); // 內建的
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

// C:\Users\USER\Desktop\node-chat-app\public
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
const app = express();

// 平常是express在背景幫我們做掉了
// 這次我們是把app帶入http模組作為callback function
// 並且把建立的http server丟進socketIO 作為callback function
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath)); // middleware 代表讓express host這個靜態檔案

// 這邊的.on method第一個參數是事件
// 第二個參數是一個callback function
// websocket是一個persistent tec(持續科技)
// 代表著server端跟client端可以持續的將communication channel開啟
// 並且保持著這個雙向的資料通道直到其中一方不爽連為止
// 如果是client端發起中斷連線，那server端也不能做甚麼，反之亦然
// 但特殊例外的情況像是我們使用nodemon每次重啟server時
// client端其實是會試圖重新取得連線的(reconnect)
// 這個io.on 的 connection事件
io.on('connection', (socket) => {
    console.log('New user connected');
    // emit這個method只能單純的回傳某個資料，而不能回傳callback function
    

    // socket.emit 一個加入聊天室的歡迎詞
    socket.emit(
        'newMessage', 
        generateMessage('PaulBot', `Welcome to the chat app`)
    )
    socket.broadcast.emit(
        'newMessage','newMessage', 
        generateMessage('PaulBot', `Welcome to the chat app`)
    )

    socket.on('createMessage', (message) => {
        // socket.emit 是發射到單一connection
        // io.emit 是發射到每一個單一的connection
        console.log('接收到message')

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
        // broadcast有自己的emit function
        // 可以限制連線的人於特定
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })

    // 這邊是socket.on聽某個事件的callback function
    socket.on('disconnect', () => {
      console.log('User was disconnected');
    });
});

// 以往我們使用express 直接聽port 
// 在這邊我們用http server去聽
server.listen(port, () => {
    console.log(`Now App runing on ${port}`)
})















// 在背景中，
// express確實是使用了node的http模組來建立這個http server
// 因此當我們要使用socket.io時，事實上我們需要自己建立一些定義
// 表示我們要使用http server且要支援websocket



// let recivedNewMessage = false;
// let doneMessage = null;
// recivedNewMessage = true;
// doneMessage = newMessage;
        // if(recivedNewMessage) {
        //     socket.emit('doneCreateMessage', doneMessage)
        // }
        // recivedNewMessage = false;
        // doneMessage = null;