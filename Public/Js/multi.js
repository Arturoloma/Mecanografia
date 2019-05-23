"use strict"
var socket = io.connect();




socket.on("assign_room", function(room)
{
  //console.log("Room del jugador " + socket.id + " -> " + room);
  roomId = room;
});


socket.on("nombre_duplicado", function(nuevoNombre)
{
  miNombre = nuevoNombre;
});


socket.on("start", function(jugadores)
{
  if (enCola)
  {
    document.getElementById("span_jugar").innerHTML = "¡Partida lista!";
    if (jugadores.jugador1 === miNombre) { nombreEnemigo = jugadores.jugador2; }
    else                                 { nombreEnemigo = jugadores.jugador1; }
    SceneMachine(scCuentaAtras);

    enCola = false;
    jugandoMulti = true;
  }
});


socket.on("actualizar_progreso", function (datos)
{
  ActualizarProgresoEnemigo(datos);
});


function UnirseACola()
{
  if (!enCola)
  {
    enCola = true;
    miNombre = document.getElementById("nombre").value;

    EstiloBotonesEnCola();

    socket.emit("join_queue", { nombre: miNombre, dificultad: dificultad.nombre });
  }
}


function SalirDeCola()
{
  if (enCola)
  {
    socket.emit("leave_queue");
    InicializarSeleccionDificultad();
    enCola = false;
  }
}


function ActualizarProgresoEnemigo(datos)
{
  if (jugandoMulti)
  {
    if (datos.jugador !== miNombre)
    {
      //console.log("Room Id: " + datos.room + " - Player Id: " + datos.jugador + " - Progreso: " + datos.progreso + "%");
      document.getElementById("opt-progreso-multi").innerHTML = datos.progreso + "%";
      document.documentElement.style.setProperty('--progreso-multi', datos.progreso + "%");
    }
  }
}


function EnviarProgresoAlServidor(progreso)
{
  if (jugandoMulti)
  {
    socket.emit("nuevo_progreso", { room: roomId, jugador: miNombre, progreso: progreso });
  }
}
