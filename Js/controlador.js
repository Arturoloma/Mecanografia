'use strict'

/***
 * controlador.js gestiona la lógica de la aplicación y hace las llamadas
 * correspondientes a la Vista para mostrar los cambios al usuario.
***/





/**
 * SeleccionarDificultad() actualiza la dificultad de la variable global
 * situada en configuracion.js en función de la dificultad indicada por el
 * Modelo (en userinput.js). A continuación, indica a la Vista que actualice
 * el estado de los botones de selección de dificultad.
 */
function SeleccionarDificultad(dificultadSeleccionada)
{
  switch (dificultadSeleccionada)
  {
    case "facil":
      dificultad = dificultades.facil;
      break;

    default:
    case "normal":
      dificultad = dificultades.normal;
      break;

    case "dificil":
      dificultad = dificultades.dificil;
      break;
  }

  ActivarBotonDificultad(dificultadSeleccionada);
}


/**
 * IniciarCuentaAtras() reinicia el tiempo restante de la cuenta atrás y llama
 * a la vista para que la actualice cada segundo. Cuando la cuenta acaba, le
 * pide al scenemanager.js que abra el panel de juego.
 */
function IniciarCuentaAtras()
{
  tRestanteCuentaAtras = tTotalCuentaAtras;
  ActualizarCuentaAtras(tRestanteCuentaAtras);

  var cuenta = setInterval(function()
  {
    tRestanteCuentaAtras -= 1;
    ActualizarCuentaAtras(tRestanteCuentaAtras);
    if (tRestanteCuentaAtras <= 0)
    {
      SceneMachine(scJuego);
      clearInterval(cuenta);
    }
  }, 850);                                                                      // 850 en lugar de 1000 a propósito, por experiencia de usuario
}


/**
 * ControlarAvanceDePalabra() quita el espacio del input, comprueba si es
 * correcto y, si lo es, hace que la palabra actual que tiene que escribir el
 * jugador avance, calcula las pulsaciones por minuto y el progreso (%).
 */
function ControlarAvanceDePalabra(subIpt, subRef)
{
  const subIptNoEspacio = EliminarEspacioDelInput(subIpt);
  const iptCorrecto = ControlarSiInputCorrecto(subIptNoEspacio, subRef);

  if (iptCorrecto)
  {
    AvanzarPalabra();
    CalcularPPM();
    CalcularProgreso();
  }
}


/**
 * ControlarVictoria() comprueba si el usuario ha completado el texto y, si lo
 * ha hecho, llama al fin del juego.
 */
function ControlarVictoria(subIpt, subRef)
{
  const iptCorrecto = ControlarSiUltimaPalabraCorrecta(subIpt, subRef);

  if (iptCorrecto)
  {
    idCharActual += palabras[idPalabraActual].length;                           // Sumo el número de caracteres de la palabra actual (que es la última) para poder calcular el progreso.
    GameOver();
  }
}


/**
 * ControlarDerrota() comprueba si el usuario ha perdido debido a la tormenta y,
 * si lo ha hecho, llama al fin del juego.
 */
function ControlarDerrota(porQuemar)
{
  /*
   * Si el caracter cuya mecha se va a quemar pertenece a una palabra posterior
   * a la palabra que está escribiendo el jugador, fin del juego.
   */
  if (parseInt(porQuemar.parentNode.dataset.word) >= idPalabraActual)
  {
    GameOver();
  }
}


/**
 * ControlarSiInputCorrecto() compara dos cadenas de caracteres y devuelve true
 * si son iguales. Además, contabiliza un error si no lo son. A continuación,
 * pide a la Vista que estilice la caja de texto del input en función de la
 * comparación.
 */
function ControlarSiInputCorrecto(subIpt, subRef)
{
  const iptCorrecto = subIpt === subRef;

  /*
   * El error se contabiliza si la comparación devuelve false Y si el input
   * actual del usuario es más largo que el input anterior, para no contabilizar
   * errores de más cuando haya varios consecutivos y los esté borrando.
   */
  if (!iptCorrecto && subIpt.length > subIptAnterior.length)
  {
    errores++;
  }

  EstilizarInput(iptCorrecto);
  subIptAnterior = subIpt;

  return iptCorrecto;
}


/**
 * ControlarSiUltimaPalabraCorrecta() compara dos cadenas de caracteres y
 * contabiliza un error si no lo son. A continuación, pide a la Vista que
 * estilice la caja de texto del input en función de la comparación. Luego,
 * compara si el input es igual a la última palabra y devuelve true o false. 
 */
function ControlarSiUltimaPalabraCorrecta(subIpt, subRef)
{
  const iptCorrecto = subIpt === subRef;

  /*
   * El error se contabiliza si la comparación devuelve false Y si el input
   * actual del usuario es más largo que el input anterior, para no contabilizar
   * errores de más cuando haya varios consecutivos y los esté borrando.
   */
  if (!iptCorrecto && subIpt.length > subIptAnterior.length)
  {
    errores++;
  }

  EstilizarInput(iptCorrecto);
  subIptAnterior = subIpt;

  return subIpt === palabras[idPalabraActual];
}


function EliminarEspacioDelInput(subIpt)
{
  subIpt = subIpt.substring(0,subIpt.length-1);
  MostrarInputSinEspacio(subIpt);

  return subIpt;
}


function AvanzarPalabra()
{
  ResaltarPalabraActual(false);

  idCharActual += palabras[idPalabraActual].length + 1;                         // Sumo el número de caracteres de la palabra actual + un espacio
  idPalabraActual += 1;                                                         // Actualizo el id de la palabra actual DESPUÉS de lo anterior

  ResaltarPalabraActual(true);
  ResetInput();
}


function GameOver()
{
  BloquearInput();

  const progreso = CalcularProgreso();
  const ppm = CalcularPPM();
  const perErrores = 100 * (errores / idCharActual);

  SceneMachine(scResultados);
  MostrarResultados(progreso, ppm, perErrores);
}


function CalcularPPM()
{
  const tAhora = new Date();
  const tTotal = (tAhora.getTime() - tIni.getTime()) / 1000 / 60;               // getTime() devuelve el tiempo desde 1970 en ms. Divido entre 1000 para convertir a segundos y entre 60 para convertir a mins.
  const ppm = Math.abs(Math.floor(idCharActual / tTotal));

  MostrarPPM(ppm);
  return ppm;                                                                   // Para el game over
}


function CalcularProgreso()
{
  const progreso = Math.floor(100*(idCharActual / largoTexto));
  MostrarProgreso(progreso);
  return progreso;                                                              // Para el game over
}


function CargarOleada()
{
  ActualizarOleada();
  idCharCarga++;
}


function DescargarOleada()
{
  const chispa = document.querySelector("span[data-gchar='" + idCharDescarga + "']");
  AvanzarChispa(chispa);

  if (chispa.dataset.char === "0")
  {
     PrenderPalabra(chispa);
  }
  if (idCharDescarga > 0)
  {
    const porQuemar = document.querySelector("span[data-gchar='" + (idCharDescarga - 1) + "']");
    QuemarMecha(porQuemar);

    // Explosión de la palabra anterior a la prendida
    if(chispa.dataset.space)
    {
      ExplosionarAnterior(porQuemar);
      ControlarDerrota(porQuemar);
    }
    // Explosión de la última palabra del texto
    else if (parseInt(chispa.dataset.gchar) === largoTexto - 1)
    {
      ExplosionarUltima(chispa);
      ControlarDerrota(porQuemar);
    }
  }

  idCharDescarga++;
}
