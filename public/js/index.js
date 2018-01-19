var socket = io();
// 我們可以emit一個event，讓client或server可以去listen此envent
// 假設我們做的是email app，那server將會emit一個event叫做
// new email，並且client端在server有發現new email的時候
// 可以接收到server端丟過來的資訊
// 這邊的connect跟server端的connection是一樣的
socket.on('connect', function () { // 用socketIO打開webSocket
    console.log('Connected to server');
    // socket.emit('createMessage', {
    //     from: 'paul',
    //     text: 'hello!'
    // })
});

socket.on('newMessage', function(res) {
    console.log(res);
    console.log(res.from + ': ' + res.text + '.  ' + res.createdAt)
})

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});


// socket.emit('createMessage', {
// 	to: '鍾哥',
// 	message: '您好您好您好ㄆㄆ!'
// })