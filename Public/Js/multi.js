"use strict"
var socket = io.connect();
var roomId = "";




socket.on("new_room", function(room)
{
  roomId = room;
});


socket.on("actualizar_progreso", function (datos)
{
  ActualizarProgresoEnemigo(datos);
});


function ActualizarProgresoEnemigo(datos)
{
  if (datos.jugador !== miNombre)
  {
    console.log("Room Id: " + datos.room + " - Player Id: " + datos.jugador + " - Progreso: " + datos.progreso + "%");
    document.getElementById("opt-progreso-multi").innerHTML = datos.progreso + "%";
    document.documentElement.style.setProperty('--progreso-multi', datos.progreso + "%");
  }
}



function EnviarProgresoAlServidor(progreso)
{
  socket.emit("nuevo_progreso", { room: roomId, jugador: miNombre, progreso: progreso });
}
