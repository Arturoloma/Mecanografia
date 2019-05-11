'use strict'

function HotZone (ciclosRestantes)
{
   setTimeout(function ()
   {
     if (cargando)
     {
       CargarOleada();

       switch (faseActual)
       {
         default:
         case 0:
         case 1:
         case 2:
           if (idCharCarga >= charsPorFase * (faseActual + 1))
           {
             tLoop = (dificultad.fases[faseActual].descarga * 1000) / charsPorFase;
             cargando = false;
           }

         case 3:
           if (idCharCarga >= largoTexto)
           {
             tLoop = (dificultad.fases[faseActual].descarga * 1000) / charsUltimaFase;
             cargando = false;
           }
           break;
       }
     }
     else
     {
       DescargarOleada();

       switch (faseActual)
       {
         default:
         case 0:
         case 1:
           if (idCharDescarga >= charsPorFase * (faseActual + 1))
           {
             faseActual++;
             tLoop = (dificultad.fases[faseActual].carga * 1000) / charsPorFase;
             cargando = true;
           }

         case 2:
           if (idCharDescarga >= charsPorFase * (faseActual + 1))
           {
             faseActual++;
             tLoop = (dificultad.fases[faseActual].carga * 1000) / charsUltimaFase;
             cargando = true;
           }
           break;

         case 3:
           if (idCharDescarga >= largoTexto)
           {
             faseActual++;
           }
           break;
       }
     }

     if (escenaActual === scJuego && faseActual < 4)
     {
       HotZone();
     }
   }, tLoop);
}
