'use strict'

/***
 * userinput.js es un script de Modelo destinado a detectar los inputs del
 * usuario y pedir a los scripts de Controlador pertinentes que ejecuten lo
 * necesario en función del input detectado.
***/




/* ---------------------- INPUTS DE CAMBIO DE ESCENA ------------------------ */

// Seleccionar dificultad => Juego
document.getElementById("inicio_jugar").addEventListener("click",function(){ UnirseACola(); }, false);

// Juego => Seleccionar dificultad
document.getElementById("juego_inicio").addEventListener("click", function(){ SceneMachine(scDificultad); }, false);

// Juego => Juego
document.getElementById("juego_juego").addEventListener("click", function(){ SceneMachine(scCuentaAtras); }, false);

// Resultados => Juego
document.getElementById("resultados_jugar").addEventListener("click", function(){ SceneMachine(scCuentaAtras); }, false);

// Resultados => Seleccionar dificultad
document.getElementById("resultados_inicio").addEventListener("click", function(){ SceneMachine(scDificultad); }, false);

/* -------------------------------------------------------------------------- */





/* ------------------- INPUTS DE SELECCIÓN DE DIFICULTAD -------------------- */

document.getElementById("boton_nivel_facil").addEventListener("click", function(){ SeleccionarDificultad("facil"); }, false);
document.getElementById("boton_nivel_normal").addEventListener("click", function(){ SeleccionarDificultad("normal"); }, false);
document.getElementById("boton_nivel_dificil").addEventListener("click", function(){ SeleccionarDificultad("dificil"); }, false);

/* -------------------------------------------------------------------------- */





/* ------------------------ INPUTS DURANTE EL JUEGO ------------------------- */

/**
 * Este evento se activa cada vez que el usuario introduce un input en la caja
 * de texto con el id "ipt-texto" y está encargado de determinar qué tiene
 * que hacer el controlador en función de tres casos:
 *   1.  El jugador está escribiendo la última palabra: controlar victoria.
 *   2a. El jugador ha pulsado espacio: controlar si puede avanzar de palabra.
 *   2b. El jugador no ha pulsado espacio: ¿lo que ha escrito hasta ahora está bien?
 */
document.getElementById("ipt-texto").addEventListener("input", function()
{
  const subIpt = iptTexto.value;                                                // Lo que ha escrito el usuario.
  const subRef = palabras[idPalabraActual].substring(0,subIpt.length);          // Subcadena de la palabra actual, del mismo largo que lo que lleva escrito el usuario.

  if (EsUltimaPalabra() === false) {
    if (UltimoCharEsEspacio(subIpt)) {
      ControlarAvanceDePalabra(subIpt, subRef);
    }
    else {
      ControlarSiInputCorrecto(subIpt, subRef);
    }
  }
  else {
    ControlarVictoria(subIpt, subRef);
  }
});


function EsUltimaPalabra()
{
  return idPalabraActual === palabras.length - 1;
}


function UltimoCharEsEspacio(subIpt)
{
  return subIpt.charAt(subIpt.length-1) === " ";
}
/* ----------------------------- */
