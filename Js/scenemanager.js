
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
      HotZone();
      panelJuego.classList.remove("ocultar_elemento");
      iptTexto.focus();
      break;

    case scResultados:
      panelResultados.classList.remove("ocultar_elemento");
      break;
  }
}
