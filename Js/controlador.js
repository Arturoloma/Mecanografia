'use strict'


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
    CalcularPPM();
    CalcularProgreso();
    GameOver();
  }
}


function ControlarDerrota(porQuemar)
{
  if (parseInt(porQuemar.parentNode.dataset.word) >= idPalabraActual)
  {
    CalcularPPM();
    CalcularProgreso();
    GameOver();
  }
}


function ControlarSiInputCorrecto(subIpt, subRef)
{
  EstilizarInput(subIpt === subRef);
  return subIpt === subRef;
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
  ResaltarPalabraActual(false);
  idCharActual += palabras[idPalabraActual].length + 1;                         // Sumo el número de caracteres de la palabra actual + un espacio
  BloquearInput();
  SceneMachine(scResultados);
}


function CalcularPPM()
{
  const tAhora = new Date();
  const tTotal = (tAhora.getTime() - tIni.getTime()) / 1000 / 60;               // getTime() devuelve el tiempo desde 1970 en ms. Divido entre 1000 para convertir a segundos y entre 60 para convertir a mins.
  const ppm = Math.abs(Math.floor(idCharActual / tTotal));

  MostrarPPM(ppm);
}


function CalcularProgreso()
{
  const progreso = Math.floor(100*(idCharActual / largoTexto));
  MostrarProgreso(progreso);
}


function CargarOleada()
{
  //console.log("Fase " + (faseActual + 1) + "(cargando)" + " - ch" + idCharCarga);
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
