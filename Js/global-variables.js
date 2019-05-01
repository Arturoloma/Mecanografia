'use strict'

/* ------- SCENE MANAGER ------- */
const panelDificultad  = document.getElementById("div_dificultad");
const panelCuentaAtras = document.getElementById("div_cuenta_atras");
const panelJuego       = document.getElementById("div_juego");
const panelResultados  = document.getElementById("div_resultados");

// Nombres de las escenas en la máquina de escenas de scenemanager.js
const scDificultad  = 0;
const scCuentaAtras = 1;
const scJuego       = 2;
const scResultados  = 3;

// Tiempo de la cuenta atrás en segundos
var tTotalCuentaAtras    = 5;
var tRestanteCuentaAtras = tTotalCuentaAtras;

var escenaActual = scDificultad;
/* ----------------------------- */



/* ----------- VISTA ----------- */
const iptTexto    = document.getElementById("ipt-texto");
const optTexto    = document.getElementById("ref-texto");
const optPpm      = document.getElementById("opt-ppm");
const optProgreso = document.getElementById("opt-progreso");

function InicializarVista()
{
  iptTexto.placeholder = palabras[idPalabraActual];
  iptTexto.readOnly = false;
  iptTexto.value = "";

  optTexto.innerHTML = texto;
  optPpm.innerHTML = "0 ppm";
  optProgreso.innerHTML = "0%";

  ResaltarPalabraActual(true);
}
/* ----------------------------- */



/* -------- CONTROLADOR -------- */
var idPalabraActual = 0;                                                        // Id de la palabra que tiene que escribir el jugador.
var idCharActual    = 0;                                                        // Id a nivel de texto del primer caracter de la palabra que tiene que escribir el jugador.
var tIni            = new Date();                                               // Momento de inicio del juego.

var palabras   = [];                                                            // Elijo un texto al azar de la librería y lo divido en un array buscando cualquier bloque de texto que no sea un " ".
var largoTexto = 0;                                                             // Número de caracteres del texto, incluyendo espacios.
var texto      = "";                                                            // Reconstruyo el texto a partir del array de las palabras, poniendo spans.


function InicializarControlador()
{
  idPalabraActual = 0;                                                          // Id de la palabra que tiene que escribir el jugador.
  idCharActual    = 0;                                                          // Id a nivel de texto del primer caracter de la palabra que tiene que escribir el jugador.
  tIni = new Date();                                                            // Momento de inicio del juego.

  palabras   = libreria[IndexarTextoAleatorio()].match(/\S+/gi);                // Elijo un texto al azar de la librería y lo divido en un array buscando cualquier bloque de texto que no sea un " ".
  largoTexto = CalcularLargoDelTexto();                                         // Número de caracteres del texto, incluyendo espacios.
  texto      = ConstruirTextoRevisado(palabras);
}


function IndexarTextoAleatorio()
{
  return Math.floor(Math.random() * (libreria.length - 1));
}


function CalcularLargoDelTexto()
{
  var largo = 0;
  for (var i = 0 ; i < palabras.length ; i++)
  {
    largo += palabras[i].length + 1;
  }
  return largo - 1;
}


/**
 * - ConstruirTextoRevisado() construye un texto a partir de un array de palabras
 * poniendo un <span> alrededor de cada palabra con un atributo data-word que
 * tendrá un valor igual al índice de esa palabra (empezando por 0).
 * - Cada caracter de cada palabra tendrá su propio <span> con un atributo data-char
 * que contendrá el índice del mismo dentro de la palabra.
 * - Cada espacio también tendrá su propio <span> con un atributo data-space para
 * indicar su índice en el texto.
 */
function ConstruirTextoRevisado(palabras)
{
  var textoRevisado = "";

  for (var i = 0 ; i < palabras.length ; i++)
  {
    // Abro <span> y añado las coordenadas de la palabra en un atributo data-word.
    textoRevisado += "<span data-word='" + i + "' class=''>";

    for (var j = 0 ; j < palabras[i].length ; j++)
    {
      // Si no estoy en el último caracter, abro <span> y añado sus coordenadas en un atributo data-char, pero no cierro el <span> de la palabra.
      if   (j !== palabras[i].length - 1)
      {
        textoRevisado += "<span data-char='" + j + "' class=''>" + palabras[i].charAt(j) + "</span>";
      }
      // Si estoy en el último caracter, también cierro el <span> de la palabra.
      else
      {
        textoRevisado += "<span data-char='" + j + "' class=''>" + palabras[i].charAt(j) + "</span></span>";

        // Además, si no estoy en la última palabra, añado un espacio a la derecha con su propio <span> y coordenadas como data-space.
        if (i !== palabras.length - 1)
        {
          textoRevisado += "<span data-space='" + i + "' class=''> </span>";
        }
      }
    }
  }

  return textoRevisado;
}
/* ----------------------------- */
