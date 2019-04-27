'use strict'

var Vista = function()
{
  const iptTexto = document.getElementById("ipt-texto");
  const optTexto = document.getElementById("ref-texto");
  const optPpm = document.getElementById("opt-ppm");
  const optProgreso = document.getElementById("opt-progreso");



  function Inicializar(texto, palabraActual, idPalabraActual)
  {
    optTexto.innerHTML = texto;
    iptTexto.placeholder = palabraActual;
    resaltarPalabra(texto, palabraActual.length, idPalabraActual);
  }

  function resaltarPalabra(texto, largoPalabraActual, idPalabraActual)
  {
    for (var i = 0 ; i < largoPalabraActual ; i++)
    {
      var elementoChar = document.querySelector("span[data-word='" + idPalabraActual + "'] span[data-char='" + i + "']");
      elementoChar.classList.add("palabra-actual");
    }
  }

  // NO DAR SALTO DE CARRO A LA LLAVE DE APERTURA DEL RETURN (SE ROMPE EL LITERAL)
  return {
    Inicializar:Inicializar
  }
}();
