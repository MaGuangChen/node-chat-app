var socket = io();
// 我們可以emit一個event，讓client或server可以去listen此envent
// 假設我們做的是email app，那server將會emit一個event叫做
// new email，並且client端在server有發現new email的時候
// 可以接收到server端丟過來的資訊
// 這邊的connect跟server端的connection是一樣的
socket.on('connect', function () { // 用socketIO打開webSocket
    console.log('Connected to server');
    // socket.emit('createEmail', {
    //     to: 'mike@yahoo.com.tw',
    //     title: '那個...',
    //     body: '我不想吃麵，想吃飯'
    // })
    socket.emit('createMessage', {
        to: 'paul',
        message: 'hello!'
    })
});



socket.on('doneCreateMessage', function(res) {
    console.log('您說: ')
    console.log(res.message)
})

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// 自訂的event，由前端listen，後端做emit
socket.on('newEmail', function(email) {
    console.log('Fetch one New Email')
    email.map(function(r) {
        console.log('您收到 ' + r.from + ' 的信件')
        console.log('標題: ' + r.title)
        console.log('內文: ' + r.body)
    })
})

