'use strict'

/* ----------- VISTA ----------- */
const iptTexto = document.getElementById("ipt-texto");
const optTexto = document.getElementById("ref-texto");
const optPpm = document.getElementById("opt-ppm");
const optProgreso = document.getElementById("opt-progreso");
/* ----------------------------- */



/* -------- CONTROLADOR -------- */
const palabras = libreria[ElegirTextoAleatorio()].match(/\S+/gi);               // Elijo un texto al azar de la librería y lo divido en un array buscando cualquier bloque de texto que no sea un " ".
const texto    = ConstruirTextoRevisado(palabras);                              // Reconstruyo el texto a partir del array de las palabras, poniendo spans.
/* ----------------------------- */


/* ----------- MODELO ---------- */
/* ----------------------------- */
