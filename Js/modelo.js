'use strict'

// ON INPUT
document.getElementById("ipt-texto").addEventListener("input", function()
{
  alert("hay input");
  if (esUltimaPalabra() === false)
  {
    alert ("es ultima palabra");
    if (ultimoCharEsEspacio())
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

function esUltimaPalabra()
{
  alert(Controlador.IdPalabraActual);
  alert(Controlador.Palabras.length);
  //if (Controlador.IdPalabraActual === Controlador.Palabras.length -1) { return true; }
  //else                                                                { return false;}
}

function ultimoCharEsEspacio()
{

}
