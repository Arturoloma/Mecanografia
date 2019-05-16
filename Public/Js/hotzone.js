'use strict'

/***
 * hotzone.js es un script de Modelo destinado a calcular los cambios de fase de
 * la tormenta, y los cambios de carga a descarga dentro de la fase. Cuando se
 * produce un cambio de carga a descarga, o de fase, se indica al Controlador.
***/




/**
 * HotZone() es un loop iniciado por el Modelo cuando comienza el juego que
 * consiste en un setTimeout cuyo tiempo de espera cambia cuando se cambia de
 * fase, o de carga a descarga.
 *
 * Cuando pasa el tiempo, se comprueba si se está cargando o descargando, se
 * indica al Controlador que haga lo que toque en función de ello y se comprueba
 * si se está en el caracter final de la fase. Si es así, se produce el cambio
 * de carga a descarga, o de fase, y se recalcula el tiempo del setTimeout en
 * función de la configuración y de la dificultad seleccionada.
 *
 * El bucle se interrumpe cuando se acaba la última fase o se sale de la escena
 * de juego.
 */
function HotZone()
{
   // Lo que hay dentro del setTimeout se hace después de tiempo == tLoop
   var tormenta = setTimeout(function ()
   {
     // CARGANDO
     if (cargando)
     {
       // Indico al Controlador que haga crecer la mecha.
       CargarOleada();

       switch (faseActual)
       {
         /*
          * Considero que he acabado de cargar cuando el caracter al que tengo
          * que añadir mecha a continuación es el último de la fase actual.
          * El id del caracter se actualiza desde el Controlador en CargarOleada().
          */
         default:
         case 0:
         case 1:
         case 2:
           // Sumo 1 a la fase actual porque comienza en 0
           if (idCharCarga >= charsPorFase * (faseActual + 1))
           {
             tLoop = (dificultad.fases[faseActual].descarga * 1000) / charsPorFase;
             cargando = false;
           }
         /*
          * Trato la última fase excepcionalmente porque puede tener un largo
          * distinto al del resto.
          */
         case 3:
           if (idCharCarga >= largoTexto)
           {
             tLoop = (dificultad.fases[faseActual].descarga * 1000) / charsUltimaFase;
             cargando = false;
           }
           break;
       }
     }

     // DESCARGANDO
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
         // Entro a la carga de la última fase
         case 2:
           if (idCharDescarga >= charsPorFase * (faseActual + 1))
           {
             faseActual++;
             tLoop = (dificultad.fases[faseActual].carga * 1000) / charsUltimaFase;
             cargando = true;
           }
           break;
         // Fin de la descarga de la última fase (fin del juego)
         case 3:
           if (idCharDescarga >= largoTexto)
           {
             faseActual++;
           }
           break;
       }
     }

     // CONDICIONES PARA CONTINUAR EL BUCLE
     if (escenaActual === scJuego && faseActual < 4)
     {
       HotZone();
     }
     else
     {
       window.clearTimeout(tormenta);                                           // Limpieza del timeout por seguridad
     }
   }, tLoop);
}
