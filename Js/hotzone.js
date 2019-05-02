'use strict'

function CargarZona (i)
{
   setTimeout(function ()
   {
      alert('hello');
      if (--i)
      {
        CargarZona(i);
      }
   }, (dificultad.fases[faseActual].carga * 1000) / charsPorCarga);
}
