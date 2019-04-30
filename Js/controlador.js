'use strict'

// INICIALIZACIÓN
var idPalabraActual = 0;
InicializarVista(texto, palabras[0], idPalabraActual);



// FUNCIONES
function PruebaControlador()
{
  console.log("PruebaControlador()");
}

function ElegirTextoAleatorio()
{
  var indice = Math.floor(Math.random() * (libreria.length - 1));
  return indice;
}


function ConstruirTextoRevisado(palabras)
{
  var textoRevisado = "";

  for (var i = 0 ; i < palabras.length ; i++)
  {
    textoRevisado += "<span data-word='" + i + "' class=''>";

    for (var j = 0 ; j < palabras[i].length ; j++)
    {
      if   (j !== palabras[i].length - 1) { textoRevisado += "<span data-char='" + j + "' class=''>" + palabras[i].charAt(j) + "</span>"; }
      else                                { textoRevisado += "<span data-char='" + j + "' class=''>" + palabras[i].charAt(j) + "</span></span>" + " "; }
    }
  }

  return textoRevisado;
}
