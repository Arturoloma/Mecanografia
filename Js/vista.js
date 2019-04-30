'use strict'

// FUNCIONES
function InicializarVista(texto, palabraActual, idPalabraActual)
{
  optTexto.innerHTML = texto;
  iptTexto.placeholder = palabraActual;
  resaltarPalabra(palabraActual.length, idPalabraActual);
}

function resaltarPalabra(largoPalabraActual, idPalabraActual)
{
  for (var i = 0 ; i < largoPalabraActual ; i++)
  {
    var elementoChar = document.querySelector("span[data-word='" + idPalabraActual + "'] span[data-char='" + i + "']");
    elementoChar.classList.add("palabra-actual");
  }
}
