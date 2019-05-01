
// Seleccionar dificultad => Juego
document.getElementById("inicio_jugar").addEventListener("click", function(){ SceneMachine(scCuentaAtras); }, false);

// Juego => Seleccionar dificultad
document.getElementById("juego_inicio").addEventListener("click", function(){ SceneMachine(scDificultad); }, false);

// Juego => Juego
document.getElementById("juego_juego").addEventListener("click", function(){ SceneMachine(scCuentaAtras); }, false);

// Resultados => Juego
document.getElementById("resultados_jugar").addEventListener("click", function(){ SceneMachine(scCuentaAtras); }, false);

// Resultados => Seleccionar dificultad
document.getElementById("resultados_inicio").addEventListener("click", function(){ SceneMachine(scDificultad); }, false);




function SceneMachine(direccion)
{
  // OCULTAR
  switch (escenaActual)
  {
    default:
    case scDificultad:
      panelDificultad.classList.add("ocultar_elemento");
      break;

    case scCuentaAtras:
      panelCuentaAtras.classList.add("ocultar_elemento");
      break;

    case scJuego:
      panelJuego.classList.add("ocultar_elemento");
      break;

    case scResultados:
      panelResultados.classList.add("ocultar_elemento");
      break;
  }


  // REVELAR
  escenaActual = direccion;

  switch (direccion)
  {
    default:
    case scDificultad:
      panelDificultad.classList.remove("ocultar_elemento");
      break;

    case scCuentaAtras:
      IniciarCuentaAtras();
      panelCuentaAtras.classList.remove("ocultar_elemento");
      break;

    case scJuego:
      InicializarControlador();
      InicializarVista(idPalabraActual);
      panelJuego.classList.remove("ocultar_elemento");      
      iptTexto.focus();
      break;

    case scResultados:
      panelResultados.classList.remove("ocultar_elemento");
      break;
  }
}


function IniciarCuentaAtras()
{
  tRestanteCuentaAtras = tTotalCuentaAtras;
  ActualizarCuentaAtras(tRestanteCuentaAtras);

  var cuenta = setInterval(function()
  {
    tRestanteCuentaAtras -= 1;
    ActualizarCuentaAtras(tRestanteCuentaAtras);
    if (tRestanteCuentaAtras <= 0)
    {
      SceneMachine(scJuego);
      clearInterval(cuenta);
    }
  }, 1000);
}

function ActualizarCuentaAtras(numero)
{
  panelCuentaAtras.innerHTML = numero;
}
