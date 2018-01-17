const express = require('express');
const path = require('path'); // 內建的

// C:\Users\USER\Desktop\node-chat-app\public
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(publicPath)); // middleware 代表讓express host這個靜態檔案

app.listen(port, () => {
    console.log(`Now App runing on ${port}`)
})