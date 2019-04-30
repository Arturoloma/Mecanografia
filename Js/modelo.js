'use strict'

// ON INPUT
document.getElementById("ipt-texto").addEventListener("input", function()
{
  alert("hay input");
  if (!EsUltimaPalabra())
  {
    alert ("No es ultima palabra");
    if (UltimoCharEsEspacio())
    {

    }
    else
    {

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

function UltimoCharEsEspacio()
{
  return document.getElementById("ipt-texto")
}
