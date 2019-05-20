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
var playerWaiting = "";


io.sockets.on("connection", function(socket)
{
  socket.on("join_queue", function()
  {
    var roomId = "room_" + nextRoom;

    socket.emit("assign_room", roomId);
    socket.join(roomId);

    if (playerWaiting !== "")
    {
      io.to(roomId).emit("start");
      playerWaiting = "";
      nextRoom++;
    }
    else
    {
      playerWaiting = socket.id;
    }
  });


  socket.on("nuevo_progreso", function(datos)
  {
    io.to(datos.room).emit("actualizar_progreso", datos);
  });



  socket.on('disconnect', function()
  {
    if (socket.id === playerWaiting)
    {
      playerWaiting = "";
    }
  });
});



//Escucha del server
server.listen(port, function() {
  console.log('Servidor en el ' + port);
});
