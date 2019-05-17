'use strict'

//Estancias necesarias
var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require("socket.io");
var io = socket(server);
var port = process.env.PORT || 3000;
app.use('/static', express.static(__dirname + '/public'));

var connections=[];
var players=[];

//Cuando se conecta un usuario,se guarda en connections para saber cuantos hay en total
io.sockets.on('connection', function(socket) {
  connections.push(socket);
//recibe la informacion de jugadores
  socket.on("start",function(data){
    players=data;
  });
});

//Envia el progreso recibido a todos los usuarios
function envioProgreso(){
  io.sockets.emit("envioProgreso",players);
}
//Para que lo envie cada segundo
setInterval(envioProgreso,1000);


//Escucha del server
server.listen(port, function() {
  console.log('Servidor en el ' + port);
});
