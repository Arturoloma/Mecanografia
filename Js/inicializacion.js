'use strict'

/* ----------- VISTA ----------- */
function InicializarVista()
{
  iptTexto.placeholder = palabras[idPalabraActual];
  iptTexto.readOnly = false;
  iptTexto.value = "";
  iptTexto.style.backgroundColor = "white";
  iptTexto.style.color = "black";

  optTexto.innerHTML = texto;
  optPpm.innerHTML = "0 ppm";
  optProgreso.innerHTML = "0%";

  ResaltarPalabraActual(true);
}
/* ----------------------------- */




/* -------- CONTROLADOR -------- */
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




/* ---------- HOT ZONE --------- */
function InicializarHotZone(dificultad)
{
  idCharCarga = 0;
  charsPorFase = Math.round(largoTexto / 4);

  // Selección de la dificultad
  switch (dificultad)
  {
    case "facil":
      dificultad = dificultades.facil;
      tHotZone += dificultades.facil.fase1.carga + dificultades.facil.fase1.descarga
                + dificultades.facil.fase2.carga + dificultades.facil.fase2.descarga
                + dificultades.facil.fase3.carga + dificultades.facil.fase3.descarga
                + dificultades.facil.fase4.carga + dificultades.facil.fase4.descarga;
      break;

    default:
    case "medio":
      dificultad = dificultades.medio;
      tHotZone += dificultades.medio.fase1.carga + dificultades.medio.fase1.descarga
                + dificultades.medio.fase2.carga + dificultades.medio.fase2.descarga
                + dificultades.medio.fase3.carga + dificultades.medio.fase3.descarga
                + dificultades.medio.fase4.carga + dificultades.medio.fase4.descarga;
      break;

    case "dificil":
      dificultad = dificultades.dificil;
      tHotZone += dificultades.dificil.fase1.carga + dificultades.dificil.fase1.descarga
                + dificultades.dificil.fase2.carga + dificultades.dificil.fase2.descarga
                + dificultades.dificil.fase3.carga + dificultades.dificil.fase3.descarga
                + dificultades.dificil.fase4.carga + dificultades.dificil.fase4.descarga;
      break;
  }
}
/* ----------------------------- */
