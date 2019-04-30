'use strict'

// FUNCIONES
function InicializarVista()
{
  optTexto.innerHTML = texto;
  iptTexto.placeholder = palabras[idPalabraActual];
  ResaltarPalabraActual(idPalabraActual);
}

function ResaltarPalabraActual()
{
  for (var i = 0 ; i < palabras[idPalabraActual].length ; i++)
  {
    var elementoChar = document.querySelector("span[data-word='" + idPalabraActual + "'] span[data-char='" + i + "']");
    elementoChar.classList.add("palabra-actual");
  }
}

function QuitarResaltePalabraAnterior()
{
  for (var i = 0 ; i < palabras[idPalabraActual].length ; i++)
  {
    var elementoChar = document.querySelector("span[data-word='" + idPalabraActual + "'] span[data-char='" + i + "']");
    elementoChar.classList.remove("palabra-actual");
  }
}

function MostrarInputSinEspacio(subIpt)
{
  iptTexto.value = subIpt;
}

function EstilizarInput(iptCorrecto)
{
  if (iptCorrecto)
  {
    iptTexto.style.backgroundColor = "white";
    iptTexto.style.color = "black";
  }
  else
  {
    iptTexto.style.backgroundColor = "red";
    iptTexto.style.color = "white";
  }
}

function ResetInput()
{
  iptTexto.placeholder = palabras[idPalabraActual];
  iptTexto.value = "";
}

function MostrarPPM(ppm)
{
  optPpm.innerHTML = ppm.toString() + " ppm";
}

function MostrarProgreso(progreso)
{
  optProgreso.innerHTML = progreso + "%";
}
