var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('joinChatRoom', function (user) {
        console.log(user);
        socket.broadcast.emit('joinChatRoom', {
            user: user
        });
        socket.emit('joinChatRoom', {
            user: user
        })
    });

    socket.on('sendChat', function (data) {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('sendChat', {
            data: data
        });
    });
});

app.use(express.static(__dirname + '/public'));


server.listen(3030, function () {
    console.log('Example app listening on port 3030!')
})