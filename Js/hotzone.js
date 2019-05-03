'use strict'

function HotZone (ciclosRestantes)
{
   setTimeout(function ()
   {
     if (cargando)
     {
       // INSTRUCCIONES AL CONTROLADOR
       console.log("Fase " + (faseActual + 1) + "(cargando)" + " - ch" + idCharCarga);

       idCharCarga++;

       switch (faseActual)
       {
         default:
         case 0:
         case 1:
         case 2:
           if (idCharCarga >= charsPorFase * (faseActual + 1))
           {
             tLoop = (dificultad.fases[faseActual].descarga * 1000) / charsPorFase;
             console.log("FASE " + (faseActual + 1) + "(DESCARGANDO)");
             console.log("T CICLO: " + tLoop / 1000 + " segs.");
             cargando = false;
           }

         case 3:
           if (idCharCarga >= charsPorFase * (faseActual + 1))
           {
             tLoop = (dificultad.fases[faseActual].descarga * 1000) / charsUltimaFase;
             console.log("FASE " + (faseActual + 1) + "(DESCARGANDO)");
             console.log("T CICLO: " + tLoop / 1000 + " segs.");
             cargando = false;
           }
           break;
       }
     }
     else
     {
       // INSTRUCCIONES AL CONTROLADOR
       console.log("Fase " + (faseActual + 1) + "(descargando)" + " - ch" + idCharDescarga);
       idCharDescarga++;

       switch (faseActual)
       {
         default:
         case 0:
         case 1:
           if (idCharDescarga >= charsPorFase * (faseActual + 1))
           {
             faseActual++;
             tLoop = (dificultad.fases[faseActual].carga * 1000) / charsPorFase;
             console.log("FASE " + (faseActual + 1) + "(CARGANDO)");
             console.log("T CICLO: " + tLoop / 1000 + " segs.");
             cargando = true;
           }

         case 2:
           if (idCharDescarga >= charsPorFase * (faseActual + 1))
           {
             faseActual++;
             tLoop = (dificultad.fases[faseActual].carga * 1000) / charsUltimaFase;
             console.log("FASE " + (faseActual + 1) + "(CARGANDO)");
             console.log("T CICLO: " + tLoop / 1000 + " segs.");
             cargando = true;
           }
           break;

         case 3:
           if (idCharDescarga >= charsPorFase * (faseActual + 1))
           {
             //cargando = true;
           }
           break;
       }
     }

     if (--ciclosRestantes)
     {
       HotZone(ciclosRestantes);
     }
     else
     {
       console.log("Ciclos restantes: " + ciclosRestantes);
       console.log("Fin de hotzone");
     }
   }, tLoop);
}
