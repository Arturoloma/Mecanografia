'use strict'

/***
 * inicializacion.js es un script de Controlador destinado a inicializar
 * variables a las que se tiene que dar un valor inicial en un momento concreto
 * y no al cargar. Esto ocurre principalmente al entrar en la escena de juego.
***/





/* --------------------------------- VISTA ---------------------------------- */

function InicializarSeleccionDificultad()
{
  const spanSingle = document.getElementById("span_single");
  var btnsDif = document.getElementsByClassName("boton_dificultad");

  spanSingle.innerHTML = "1 JUGADOR";
  spanSingle.style.backgroundColor = "#a2feff";
  spanSingle.style.color = "black";
  document.getElementById("span_jugar").innerHTML = "2 JUGADORES";
  document.getElementById("nombre").readOnly = false;

  for (var i = 0 ; i < btnsDif.length ; i++)
  {
    var lunares = btnsDif[i].getElementsByClassName("lunares")[0].getElementsByClassName("lunar");

    for (var j = 0 ; j < lunares.length ; j++)
    {
      lunares[j].style.backgroundColor = "#03c4d0";
    }

    btnsDif[i].style.backgroundColor = "#a2feff";
    btnsDif[i].style.color = "black";
    btnsDif[i].classList.add("clickable");
  }
}


function InicializarVista()
{
  iptTexto.placeholder = palabras[idPalabraActual];
  iptTexto.readOnly = false;
  iptTexto.value = "";
  iptTexto.classList.add("input_correcto");
  iptTexto.classList.remove("input_incorrecto");

  optTexto.innerHTML = texto;
  optPpm.innerHTML = "0 ppm";
  document.getElementById("nombre_contrincante").innerHTML = "Tu contrincante (" + nombreEnemigo + ")";
  optProgreso.innerHTML = "0%";
  document.getElementById("opt-progreso-multi").innerHTML = "0%";
  document.documentElement.style.setProperty('--progreso', "0%");
  document.documentElement.style.setProperty('--progreso-multi', "0%");

  ResaltarPalabraActual(true);
}

/* -------------------------------------------------------------------------- */





/* ------------------------------ CONTROLADOR ------------------------------- */

/**
 * InicializarControlador() reinicia los valores del Controlador al comienzo del
 * juego para evitar errores cuando haya partidas consecutivas.
 */
function InicializarControlador()
{
  idPalabraActual = 0;                                                          // Id de la palabra que tiene que escribir el jugador.
  idCharActual    = 0;                                                          // Id a nivel de texto del primer caracter de la palabra que tiene que escribir el jugador.
  tIni            = new Date();                                                 // Momento de inicio del juego.
  errores         = 0;                                                          // Número de errores que ha tenido el jugador hasta ahora.
  subIptAnterior  = "";                                                         // Lo que el usuario tenía escrito antes del último refresco del input.

  palabras   = libreria[IndexarTextoAleatorio()].match(/\S+/gi);                // Elijo un texto al azar de la librería y lo divido en un array buscando cualquier bloque de texto que no sea un " ".
  largoTexto = CalcularLargoDelTexto();                                         // Número de caracteres del texto, incluyendo espacios.
  texto      = ConstruirTextoRevisado(palabras);
}


/**
 * IndexarTextoAleatorio() devuelve un número al azar entre el 0 y el total de
 * textos de la librería (-1 para que funcione como índice).
 */
function IndexarTextoAleatorio()
{
  return Math.floor(Math.random() * (libreria.length - 1));
}


/**
 * CalcularLargoDelTexto() devuelve el largo del texto en base al largo de las
 * palabras del texto escogido al azar de la librería. Esto evita errores de
 * por espacios consecutivos en el texto original y cuenta los caracteres sin
 * lidiar con el html que se añade al reconstruír el texto.
 */
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
 * ConstruirTextoRevisado() construye un texto a partir de un array de palabras
 * poniendo un <span> alrededor de cada palabra con un atributo data-word que
 * tendrá un valor igual al índice de esa palabra (empezando por 0) y un
 * atributo data-length que contiene el largo de la palabra.
 *
 * Cada caracter de cada palabra tendrá su propio <span> con atributo data-char
 * que contendrá el índice del mismo dentro de la palabra, además de un
 * atributo data-gchar que contendrá el índice dentro del texto completo.
 *
 * Cada espacio también tendrá su propio <span> con un atributo data-space para
 * indicar su índice en el texto y el atributo data-gchar.
 */
function ConstruirTextoRevisado(palabras)
{
  var textoRevisado = "";
  var gChar = 0;

  for (var i = 0 ; i < palabras.length ; i++)
  {
    // Abro <span/> de la palabra y añado sus atributos personalizados.
    textoRevisado += "<span data-word='" + i + "' data-length='" + palabras[i].length + "' class=''>";

    // Este bucle añade los caracteres con sus spans
    for (var j = 0 ; j < palabras[i].length ; j++)
    {
      // Hago esto sólo para el primer caracter del texto
      if (i === 0 && j === 0)
      {
        textoRevisado += "<span data-char='" + j + "' data-gchar='" + gChar + "' class='p-oleada'>" + palabras[i].charAt(j) + "</span>";
        gChar++;
      }
      // Abro y cierro el <span/> del caracter, y añado sus atributos.
      else if   (j !== palabras[i].length - 1)
      {
        textoRevisado += "<span data-char='" + j + "' data-gchar='" + gChar + "' class=''>" + palabras[i].charAt(j) + "</span>";
        gChar++;
      }
      // Si estoy en el último caracter, también cierro el <span/> de la palabra.
      else
      {
        textoRevisado += "<span data-char='" + j + "' data-gchar='" + gChar + "' class=''>" + palabras[i].charAt(j) + "</span></span>";
        gChar++;

        // Además, si no estoy en la última palabra, añado un espacio a la derecha con su propio <span> atributos.
        if (i !== palabras.length - 1)
        {
          textoRevisado += "<span data-space='" + i + "' data-gchar='" + gChar + "' class=''>&#32;</span>";
          gChar++;
        }
      }
    }
  }

  return textoRevisado;
}
/* -------------------------------------------------------------------------- */





/* -------------------------------- HOT ZONE -------------------------------- */

/**
 * InicializarHotZone() reinicia los valores de la tormenta al comienzo del
 * juego para evitar errores cuando haya partidas consecutivas.
 */
function InicializarHotZone()
{
  faseActual = 0;
  cargando = true;
  idCharCarga = 0;
  idCharDescarga = 0;
  charsPorFase = Math.round(largoTexto / 4);
  charsUltimaFase = largoTexto - (charsPorFase * 3);
  tLoop = (dificultad.fases[faseActual].carga * 1000) / charsPorFase;
}

/* -------------------------------------------------------------------------- */
