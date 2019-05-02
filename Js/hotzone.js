'use strict'

function StartHotZone()
{
  var hotZoneTick = setInterval(function()
  {
    idCharCarga += 1;
    console.log(idCharCarga);
    if (escenaActual !== scJuego)
    {
      clearInterval(hotZoneTick);
    }
  }, (tHotZone * 1000) / largoTexto);
}
