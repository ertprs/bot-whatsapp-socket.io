const io = require("socket.io-client");
var socket = io.connect("http://localhost:3000");

socket.emit("received", {
    number: '555555555555@c.us',
    content: 'Esta é uma mensagem enviada através de socker.io'
});
