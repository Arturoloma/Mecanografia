'use strict'

/* ----------- VISTA ----------- */
const iptTexto = document.getElementById("ipt-texto");
const optTexto = document.getElementById("ref-texto");
const optPpm = document.getElementById("opt-ppm");
const optProgreso = document.getElementById("opt-progreso");
/* ----------------------------- */



/* -------- CONTROLADOR -------- */
var idPalabraActual = 0;
var idCharActual = 0;

const palabras = libreria[ElegirTextoAleatorio()].match(/\S+/gi);               // Elijo un texto al azar de la librería y lo divido en un array buscando cualquier bloque de texto que no sea un " ".
const largoTexto = CalcularLargoDelTexto();
const texto    = ConstruirTextoRevisado(palabras);                              // Reconstruyo el texto a partir del array de las palabras, poniendo spans.
const tIni     = new Date();                                                    // Momento de inicio del juego.



function ElegirTextoAleatorio()
{
  var indice = Math.floor(Math.random() * (libreria.length - 1));
  return indice;
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

function ConstruirTextoRevisado(palabras)
{
  var textoRevisado = "";

  for (var i = 0 ; i < palabras.length ; i++)
  {
    // Abro <span> con las coordenadas de la palabra
    textoRevisado += "<span data-word='" + i + "' class=''>";

    for (var j = 0 ; j < palabras[i].length ; j++)
    {
      // Si no estoy en el último caracter, abro <span> con las coordenadas pero no cierro el de la palabra
      if   (j !== palabras[i].length - 1)
      {
        textoRevisado += "<span data-char='" + j + "' class=''>" + palabras[i].charAt(j) + "</span>";
      }
      // Si estoy en el último caracter, también cierro el <span> de la palabra
      else
      {
        textoRevisado += "<span data-char='" + j + "' class=''>" + palabras[i].charAt(j) + "</span></span>";

        // Además, si no estoy en la última palabra, añado un espacio a la derecha con su propio <span>
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


/* ----------- MODELO ---------- */
/* ----------------------------- */
