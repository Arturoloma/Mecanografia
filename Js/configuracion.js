
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
var tTotalCuentaAtras    = 4;
var tRestanteCuentaAtras = tTotalCuentaAtras;

var escenaActual = scDificultad;
/* ----------------------------- */




/* ----------- VISTA ----------- */
const iptTexto    = document.getElementById("ipt-texto");
const optTexto    = document.getElementById("ref-texto");
const optPpm      = document.getElementById("opt-ppm");
const optProgreso = document.getElementById("opt-progreso");
/* ----------------------------- */




/* -------- CONTROLADOR -------- */
var idPalabraActual = 0;                                                        // Id de la palabra que tiene que escribir el jugador.
var idCharActual    = 0;                                                        // Id a nivel de texto del primer caracter de la palabra que tiene que escribir el jugador.
var tIni            = new Date();                                               // Momento de inicio del juego.

var palabras   = [];                                                            // Elijo un texto al azar de la librería y lo divido en un array buscando cualquier bloque de texto que no sea un " ".
var largoTexto = 0;                                                             // Número de caracteres del texto, incluyendo espacios.
var texto      = "";
/* ----------------------------- */




/* ---------- HOT ZONE --------- */
const dificultades =
{
  facil:   {  fase1: { carga: 14, descarga: 13 },
              fase2: { carga: 14, descarga: 13 },
              fase3: { carga: 14, descarga: 13 },
              fase4: { carga: 14, descarga: 13 }
           },
  medio:   {  fases: [{ carga: 2, descarga: 1 },
                      { carga: 1, descarga: 2 },
                      { carga: 1, descarga: 3 },
                      { carga: 2, descarga: 2 }]
           },
  dificil: {  fase1: { carga: 14, descarga: 13 },
              fase2: { carga: 14, descarga: 13 },
              fase3: { carga: 14, descarga: 13 },
              fase4: { carga: 14, descarga: 13 }
           }
};

var dificultad = {};
var faseActual = 0;
var cargando = true;
var charsPorFase = 0;
var charsUltimaFase = 0;
var idCharCarga = 0;
var idCharDescarga = 0;
var tLoop = 0;
/* ----------------------------- */
