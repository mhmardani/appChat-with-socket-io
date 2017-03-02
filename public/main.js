var socket = io('http://localhost:3030');
var user = {};

$('document').ready(function () {
    $('#goToChat').on('click', function () {
        $('.loginWrapper').fadeOut(500, function () {
            $('.chatWrapper').fadeIn(null, function () {
                joinChatRoom();
            });
        });
    })
    $('#sendBtn').on('click', function () {
        var $message = $('#message');
        var message = $message.val();
        $message.val('');
        var date = {
            message: message,
            user: user
        };
        sendChat(date);
        addNewMessage(date, {isMe: true})
    })
});


function joinChatRoom() {
    user.name = $('#username').val();
    socket.emit('joinChatRoom', user)
}

function addUserInChatRoom(data) {
    $('.allMessages ul').append('<li class="messages center">' + data.user.name + ' joined chat</li>');
}

function sendChat(data) {
    socket.emit('sendChat', data)
}

function addNewMessage(data, options) {
    var _options = options ? options : {};
    if (typeof _options.isMe !== 'undefined') {
        $('.allMessages ul').append('<li class="messages isMe">' + data.user.name + ': ' + data.message + '</li>');
    } else {
        $('.allMessages ul').append('<li class="messages">' + data.data.message + ' :' + data.data.user.name + '</li>');
    }
}

socket.on('joinChatRoom', function (data) {
    addUserInChatRoom(data)
});

socket.on('sendChat', function (data) {
    addNewMessage(data, null)
});