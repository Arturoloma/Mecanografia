"use strict"
var socket = io.connect();


socket.on("actualizar_progreso", function (datos)
{
  ActualizarProgresoEnemigo(datos);
});


function ActualizarProgresoEnemigo(datos)
{
  if (datos.jugador !== socket.id)
  {
    // console.log("Id: " + socket.id + " - Progreso: " + datos.progreso + "%");
    document.getElementById("opt-progreso-multi").innerHTML = datos.progreso + "%";
    document.documentElement.style.setProperty('--progreso-multi', datos.progreso + "%");
  }
}



function EnviarProgresoAlServidor(progreso)
{
  socket.emit("nuevo_progreso", { jugador: socket.id, progreso: progreso });
}
