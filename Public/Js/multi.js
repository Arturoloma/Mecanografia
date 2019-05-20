"use strict"
var socket = io.connect();




socket.on("assign_room", function(room)
{
  console.log("Room del jugador " + socket.id + " -> " + room);
  roomId = room;
});


socket.on("nombre_duplicado", function(nuevoNombre)
{
  miNombre = nuevoNombre;
});


socket.on("start", function(jugadores)
{
  document.getElementById("span_jugar").innerHTML = "¡Partida lista!";

  if (jugadores.jugador1 === miNombre) { nombreEnemigo = jugadores.jugador2; }
  else                                 { nombreEnemigo = jugadores.jugador1; }

  SceneMachine(scCuentaAtras);
});


socket.on("actualizar_progreso", function (datos)
{
  ActualizarProgresoEnemigo(datos);
});


function UnirseACola()
{
  miNombre = document.getElementById("nombre").value;
  document.getElementById("span_jugar").innerHTML = "Esperando a otro jugador";

  socket.emit("join_queue", miNombre);
}


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
