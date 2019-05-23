'use strict'

//Estancias necesarias
var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require("socket.io");
var io = socket(server);
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/Public'));


var queues =
[
  {
    nextRoom: 0,
    playerWaiting: { id: "", nombre: "" }
  },
  {
    nextRoom: 0,
    playerWaiting: { id: "", nombre: "" }
  },
  {
    nextRoom: 0,
    playerWaiting: { id: "", nombre: "" }
  }
];


io.sockets.on("connection", function(socket)
{
  socket.on("join_queue", function(datos)
  {
    // Asignación de cola en función del nivel de dificultad elegido
    var queueId = -1;
    switch (datos.dificultad)
    {
      default:
      case "fácil":
        queueId = 0;
        break;

      case "normal":
        queueId = 1;
        break;

      case "difícil":
        queueId = 2;
        break;
    }

    // Si el cliente estaba en espera para otra dificultad, le elimino de esa cola
    for (var i = 0 ; i < queues.length ; i++)
    {
      // No me interesa eliminarle de la cola a la que se acaba de apuntar
      if ( i !== queueId )
      {
        if (socket.id === queues[i].playerWaiting.id)
        {
          queues[i].playerWaiting.id = "";
          queues[i].playerWaiting.nombre = "";
        }
      }
    }

    // Envío de la id de la sala asignada al cliente
    var roomId = "room_" + queueId + "-" + queues[queueId].nextRoom;
    socket.emit("assign_room", roomId);
    socket.join(roomId);

    // Si hay un jugador esperando en la sala, la partida comienza y preparo la siguiente
    if (queues[queueId].playerWaiting.id !== "")
    {
      // Solo comienzo si el que está en la sala no soy yo mismo
      if (queues[queueId].playerWaiting.id !== socket.id)
      {
        // Si los nombres de los jugadores son iguales, modifico el del segundo
        if (queues[queueId].playerWaiting.nombre === datos.nombre)
        {
          datos.nombre += "_2";
          socket.emit("nombre_duplicado", datos.nombre);
        }

        // Ordeno que comience la partida
        io.to(roomId).emit("start", { jugador1: queues[queueId].playerWaiting.nombre, jugador2: datos.nombre });

        // Preparación de la siguiente sala
        queues[queueId].playerWaiting.id = "";
        queues[queueId].playerWaiting.nombre = "";
        queues[queueId].nextRoom++;
      }
    }
    else
    {
      // Si la sala está vacía, pongo al jugador en espera
      queues[queueId].playerWaiting.id = socket.id;
      queues[queueId].playerWaiting.nombre = datos.nombre;
    }
  });



  socket.on("leave_queue", function()
  {
    AbandonarCola(socket);
  });



  socket.on("nuevo_progreso", function(datos)
  {
    io.to(datos.room).emit("actualizar_progreso", datos);
  });



  socket.on('disconnect', function()
  {
    AbandonarCola(socket);
  });
});


function AbandonarCola(socket)
{
  for (var i = 0 ; i < queues.length ; i++)
  {
    if (socket.id === queues[i].playerWaiting.id)
    {
      queues[i].playerWaiting.id = "";
      queues[i].playerWaiting.nombre = "";
      break;
    }
  }
}



//Escucha del server
server.listen(port, function() {
  console.log('Servidor en el ' + port);
});
