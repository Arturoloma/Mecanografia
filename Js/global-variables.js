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

const palabras = libreria[IndexarTextoAleatorio()].match(/\S+/gi);              // Elijo un texto al azar de la librería y lo divido en un array buscando cualquier bloque de texto que no sea un " ".
const largoTexto = CalcularLargoDelTexto();                                     // Número de caracteres del texto, incluyendo espacios.
const texto    = ConstruirTextoRevisado(palabras);                              // Reconstruyo el texto a partir del array de las palabras, poniendo spans.
const tIni     = new Date();                                                    // Momento de inicio del juego.



function IndexarTextoAleatorio()
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


/* ----------- MODELO ---------- */
/* ----------------------------- */
