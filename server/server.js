const express = require('express');
const http = require('http') // 內建因為我們要自己用http
const path = require('path'); // 內建的
const socketIO = require('socket.io');

// C:\Users\USER\Desktop\node-chat-app\public
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();

// 平常是express在背景幫我們做掉了
// 這次我們是把app帶入http模組作為callback function
// 並且把建立的http server丟進socketIO 作為callback function
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); // middleware 代表讓express host這個靜態檔案

// 以往我們使用express 直接聽port 
// 在這邊我們用http server去聽
server.listen(port, () => {
    console.log(`Now App runing on ${port}`)
})

// 在背景中，
// express確實是使用了node的http模組來建立這個http server
// 因此當我們要使用socket.io時，事實上我們需要自己建立一些定義
// 表示我們要使用http server且要支援websocket