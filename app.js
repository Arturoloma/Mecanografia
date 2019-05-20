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
var playerWaiting = { id: "", nombre: "" };


io.sockets.on("connection", function(socket)
{
  socket.on("join_queue", function(nombre)
  {
    var roomId = "room_" + nextRoom;

    socket.emit("assign_room", roomId);
    socket.join(roomId);

    if (playerWaiting.id !== "")
    {
      if (playerWaiting.nombre === nombre)
      {
        nombre += "_2";
        socket.emit("nombre_duplicado", nombre);
      }

      io.to(roomId).emit("start", { jugador1: playerWaiting.nombre, jugador2: nombre });

      playerWaiting.id = "";
      playerWaiting.nombre = "";
      nextRoom++;
    }
    else
    {
      playerWaiting.id = socket.id;
      playerWaiting.nombre = nombre;
    }
  });


  socket.on("nuevo_progreso", function(datos)
  {
    io.to(datos.room).emit("actualizar_progreso", datos);
  });



  socket.on('disconnect', function()
  {
    if (socket.id === playerWaiting.id)
    {
      playerWaiting.id = "";
      playerWaiting.nombre = "";
    }
  });
});



//Escucha del server
server.listen(port, function() {
  console.log('Servidor en el ' + port);
});
