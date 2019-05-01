'use strict'

/**
 * Este evento se activa cada vez que el usuario introduce un input en la caja
 * de texto con el id "ipt-texto" y está encargado de determinar qué tiene
 * que hacer el controlador en función de tres casos:
 *   1.  El jugador está escribiendo la última palabra: controlar victoria.
 *   2a. El jugador ha pulsado espacio: controlar si puede avanzar de palabra.
 *   2b. El jugador no ha pulsado espacio: ¿lo que ha escrito hasta ahora está bien?
 */
document.getElementById("ipt-texto").addEventListener("input", function()
{
  const subIpt = iptTexto.value;                                                // Lo que ha escrito el usuario.
  const subRef = palabras[idPalabraActual].substring(0,subIpt.length);          // Subcadena de la palabra actual, del mismo largo que lo que lleva escrito el usuario.

  if (EsUltimaPalabra() === false)
  {
    if (UltimoCharEsEspacio(subIpt))
    {
      ControlarAvanceDePalabra(subIpt, subRef);
    }
    else
    {
      ControlarSiInputCorrecto(subIpt, subRef);
    }
  }
  else
  {
    ControlarVictoria(subIpt, subRef);
  }
});


function EsUltimaPalabra()
{
  return idPalabraActual === palabras.length - 1;
}


function UltimoCharEsEspacio(subIpt)
{
  return subIpt.charAt(subIpt.length-1) === " ";
}
