'use strict'

// INICIALIZACIÓN
InicializarVista(idPalabraActual);



// FUNCIONES
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
    CompletarJuego();
    CalcularPPM();
    CalcularProgreso();
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


function CompletarJuego()
{
  ResaltarPalabraActual(false);

  idCharActual += palabras[idPalabraActual].length + 1;                         // Sumo el número de caracteres de la palabra actual + un espacio

  BloquearInput();
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
