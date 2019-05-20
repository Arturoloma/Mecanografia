'use strict'

//Estancias necesarias
var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require("socket.io");
var io = socket(server);
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/Public'));




io.sockets.on("connection", function(socket)
{
  // Cada vez que haya una conexión tendré que hacer algo por aquí de cara al emparejamiento

  socket.on("nuevo_progreso", function(datos)
  {
    io.sockets.emit("actualizar_progreso", datos);
  });
});



//Escucha del server
server.listen(port, function() {
  console.log('Servidor en el ' + port);
});
