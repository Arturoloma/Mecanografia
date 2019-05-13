'use strict'

/***
 * configuracion.js almacena todas las variables globales. Sus valores pueden
 * ser dados directamente aquí o actualizados por el Controlador según necesidad
***/





/* ----------------------------- SCENE MANAGER ------------------------------ */

// Paneles
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
var tTotalCuentaAtras    = 4;
var tRestanteCuentaAtras = tTotalCuentaAtras;

var escenaActual = scDificultad;

/* -------------------------------------------------------------------------- */





/* --------------------------------- VISTA ---------------------------------- */

const iptTexto    = document.getElementById("ipt-texto");
const optTexto    = document.getElementById("ref-texto");
const optPpm      = document.getElementById("opt-ppm");
const optProgreso = document.getElementById("opt-progreso");

/* -------------------------------------------------------------------------- */





/* ------------------------------ CONTROLADOR ------------------------------- */

var idPalabraActual   = 0;                                                      // Id de la palabra que tiene que escribir el jugador.
var idCharActual      = 0;                                                      // Id a nivel de texto del primer caracter de la palabra que tiene que escribir el jugador.
var tIni              = new Date();                                             // Momento de inicio del juego.
var errores           = 0;                                                      // Número de errores que ha tenido el jugador hasta ahora.
var subIptAnterior    = "";                                                     // Lo que el usuario tenía escrito antes del último refresco del input.

var palabras   = [];                                                            // Elijo un texto al azar de la librería y lo divido en un array buscando cualquier bloque de texto que no sea un " ".
var largoTexto = 0;                                                             // Número de caracteres del texto, incluyendo espacios.
var texto      = "";

/* -------------------------------------------------------------------------- */





/* ------------------------------- HOT ZONE --------------------------------- */

const dificultades =
{
  facil:   {  nombre: "fácil",
              fases: [{ carga: 32, descarga: 26 },
                      { carga: 29, descarga: 23 },
                      { carga: 26, descarga: 20 },
                      { carga: 23, descarga: 17 }]
           },
  normal:   { nombre: "normal",
              fases: [{ carga: 20, descarga: 15 },
                      { carga: 17, descarga: 13 },
                      { carga: 16, descarga: 11 },
                      { carga: 13, descarga:  9 }]
           },
  dificil: {  nombre: "difícil",
              fases: [{ carga: 11, descarga:  9 },
                      { carga:  9, descarga:  7 },
                      { carga:  7, descarga:  5 },
                      { carga:  5, descarga:  3 }]
           }
};

var dificultad = dificultades.normal;
var faseActual = 0;
var cargando = true;
var charsPorFase = 0;
var charsUltimaFase = 0;
var idCharCarga = 0;
var idCharDescarga = 0;
var tLoop = 0;

/* -------------------------------------------------------------------------- */
