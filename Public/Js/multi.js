"use strict"
var socket = io.connect();


socket.on("actualizar_progreso", function (datos)
{
  ActualizarProgresoEnemigo(datos);
});


function ActualizarProgresoEnemigo(datos)
{
  if (datos.jugador !== miNombre)
  {
    console.log("Progreso de " + datos.jugador + ": " + datos.progreso + "%");
    document.getElementById("opt-progreso-multi").innerHTML = datos.progreso + "%";
    document.documentElement.style.setProperty('--progreso-multi', datos.progreso + "%");
  }  
}



function EnviarProgresoAlServidor(progreso)
{
  socket.emit("nuevo_progreso", { jugador: miNombre, progreso: progreso });
}
