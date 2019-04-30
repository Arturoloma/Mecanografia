'use strict'

// ON INPUT
document.getElementById("ipt-texto").addEventListener("input", function()
{
  const subIpt = iptTexto.value;                                                // Lo que ha escrito el usuario
  const subRef = palabras[idPalabraActual].substring(0,subIpt.length);          // Substring de la palabra actual del mismo largo que lo que lleva escrito el usuario
  var charCorrectosAdd = 0;

  if (!EsUltimaPalabra())
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

  }
});

// FUNCIONES
function EsUltimaPalabra()
{
  return idPalabraActual === palabras.length - 1;
}

function UltimoCharEsEspacio(subIpt)
{
  return subIpt.charAt(subIpt.length-1) === " ";
}
