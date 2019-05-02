
function SceneMachine(direccion)
{
  // Oculto el panel que se estaba mostrando
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


  // Revelo el panel que se tiene que mostrar
  escenaActual = direccion;

  switch (direccion)
  {
    default:
    case scDificultad:
      panelDificultad.classList.remove("ocultar_elemento");
      break;

    case scCuentaAtras:
      InicializarControlador();
      InicializarHotZone("medio");
      IniciarCuentaAtras();
      panelCuentaAtras.classList.remove("ocultar_elemento");
      break;

    case scJuego:
      InicializarVista(idPalabraActual);
      StartHotZone();
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
  }, 850);                                                                      // 850 en lugar de 1000 aposta por UX
}


function ActualizarCuentaAtras(numero)
{
  panelCuentaAtras.innerHTML = numero;
}
