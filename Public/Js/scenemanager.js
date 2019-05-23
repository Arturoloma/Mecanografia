'use strict'

/***
 * scenemanager.js es un script de Controlador destinado a gestionar los cambios
 * de escena. Cuando detecta que se tiene que producir un cambio de escena, lo
 * ejecuta cambiando las clases pertinentes a los paneles del html y llama al
 * resto de scripts que tengan que hacer algo cuando se produce ese cambio.
***/




/**
 * SceneMachine() gestiona el cambio de escena teniendo en cuenta la escena
 * actual, para ocultar el panel que esté abierto, y la dirección (la escena a
 * la que se entra), para revelar el panel que se tiene que abrir.
 * La escena actual se guarda en una variable global en configuracion.js.
 */
function SceneMachine(direccion)
{
  /*
   * OCULTO el panel que se estaba mostrando.
   * scDificultad, scCuentaAtras, scJuego y scResultados son palabras clave para
   * diferenciar las escenas de manera semántica. Son constantes definidas en
   * configuracion.js que contienen números del 0 al 3.
   */
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


  // REVELO el panel que se tiene que mostrar
  escenaActual = direccion;
  switch (direccion)
  {
    default:
    case scDificultad:
      jugandoMulti = false;
      panelDificultad.classList.remove("ocultar_elemento");
      InicializarSeleccionDificultad();
      break;

    /*
     * Estas inicializaciones son necesarias para el juego, no para la cuenta
     * atrás. Las llamo aquí para reducir el volumen de procesos realizados en
     * el cambio a la escena de juego antes de mostrar el output de la misma.
     */
    case scCuentaAtras:
      InicializarControlador();                                                 // Reinicio valores que tengan que configurarse al comenzar a jugar.
      InicializarHotZone();                                                     // Reinicio valores de la tormenta.
      IniciarCuentaAtras();                                                     // Indico que comience la cuenta atrás.
      panelCuentaAtras.classList.remove("ocultar_elemento");
      break;

    case scJuego:
      InicializarVista(idPalabraActual);                                        // Reinicio el input y los outputs del juego.
      HotZone();                                                                // Indico que comience la tormenta.
      panelJuego.classList.remove("ocultar_elemento");
      iptTexto.focus();                                                         // Autofoco al input de texto. Tiene que estar después de la revelación del panel para funcionar.
      break;

    case scResultados:
      panelResultados.classList.remove("ocultar_elemento");
      break;
  }
}
