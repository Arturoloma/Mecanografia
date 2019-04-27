'use strict'

var Controlador = function()
{
  const palabras = libreria[elegirTextoAleatorio()].match(/\S+/gi);             // Elijo un texto al azar de la librería y lo divido en un array buscando cualquier bloque de texto que no sea un " ".
  const texto    = construirTextoRevisado(palabras);                            // Reconstruyo el texto a partir del array de las palabras, poniendo spans.
  var idPalabraActual = 0;
  Vista.Inicializar(texto, palabras[0], idPalabraActual);




  function PruebaControlador()
  {
    console.log("PruebaControlador()");
  }

  function elegirTextoAleatorio()
  {
    var indice = Math.floor(Math.random() * (libreria.length - 1));
    return indice;
  }


  function construirTextoRevisado(palabras)
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




  // NO DAR SALTO DE CARRO A LA LLAVE DE APERTURA DEL RETURN (SE ROMPE EL LITERAL)
  return {
    PruebaControlador:PruebaControlador
  }
}();
