'use strict'

//Estancias necesarias
var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require("socket.io");
var io = socket(server);
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/Public'));

var nextRoom = 0;
var playerWaiting = false;


io.sockets.on("connection", function(socket)
{
  socket.on("join_queue", function()
  {
    var roomId = "room_" + nextRoom;

    socket.emit("assign_room", roomId);
    socket.join(roomId);
    playerWaiting = !playerWaiting;
    if (!playerWaiting)
    {
      io.to(roomId).emit("start");
      nextRoom++;
    }
  });


  socket.on("nuevo_progreso", function(datos)
  {
    io.to(datos.room).emit("actualizar_progreso", datos);
  });

  // Lo que tenga que pasar cuando un usuario se desconecte
  socket.on('disconnect', function(){ });
});



//Escucha del server
server.listen(port, function() {
  console.log('Servidor en el ' + port);
});
