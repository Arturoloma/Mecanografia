'use strict'

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


function ControlarVictoria(subIpt, subRef)
{
  const iptCorrecto = ControlarSiUltimaPalabraCorrecta(subIpt, subRef);

  if (iptCorrecto)
  {
    GameOver();
  }
}


function ControlarDerrota(porQuemar)
{
  if (parseInt(porQuemar.parentNode.dataset.word) >= idPalabraActual)
  {
    GameOver();
  }
}


function ControlarSiInputCorrecto(subIpt, subRef)
{
  const iptCorrecto = subIpt === subRef;

  if (!iptCorrecto)
  {
    errores++;
  }
  EstilizarInput(iptCorrecto);

  return iptCorrecto;
}


function ControlarSiUltimaPalabraCorrecta(subIpt, subRef)
{
  EstilizarInput(subIpt === subRef);
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
  idCharActual += palabras[idPalabraActual].length + 1;                         // Sumo el número de caracteres de la palabra actual + un espacio
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
      ExplosionarAnterior(porQuemar, chispa);
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
