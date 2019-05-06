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
             // console.log("FASE " + (faseActual + 1) + "(DESCARGANDO)");
             // console.log("T CICLO: " + tLoop / 1000 + " segs.");
             cargando = false;
           }

         case 3:
           if (idCharCarga >= largoTexto)
           {
             tLoop = (dificultad.fases[faseActual].descarga * 1000) / charsUltimaFase;
             // console.log("FASE " + (faseActual + 1) + "(DESCARGANDO)");
             // console.log("T CICLO: " + tLoop / 1000 + " segs.");
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
             //console.log("FASE " + (faseActual + 1) + "(CARGANDO)");
             //console.log("T CICLO: " + tLoop / 1000 + " segs.");
             cargando = true;
           }

         case 2:
           if (idCharDescarga >= charsPorFase * (faseActual + 1))
           {
             faseActual++;
             tLoop = (dificultad.fases[faseActual].carga * 1000) / charsUltimaFase;
             //console.log("FASE " + (faseActual + 1) + "(CARGANDO)");
             //console.log("T CICLO: " + tLoop / 1000 + " segs.");
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
     else
     {
       console.log("Fin de hotzone");
     }
   }, tLoop);
}
