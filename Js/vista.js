'use strict'

function ActivarBotonDificultad(dificultadSeleccionada)
{
  const btnFacil   = document.getElementById("boton_nivel_facil");
  const btnNormal  = document.getElementById("boton_nivel_normal");
  const btnDificil = document.getElementById("boton_nivel_dificil");

  btnFacil.classList.remove("activo");
  btnNormal.classList.remove("activo");
  btnDificil.classList.remove("activo");

  switch (dificultadSeleccionada)
  {
    case "facil":
      btnFacil.classList.add("activo");
      break;

    default:
    case "normal":
      btnNormal.classList.add("activo");
      break;

    case "dificil":
      btnDificil.classList.add("activo");
      break;
  }
}


function ActualizarCuentaAtras(numero)
{
  panelCuentaAtras.innerHTML = numero;
}


function ResaltarPalabraActual(resaltar)
{
  for (var i = 0 ; i < palabras[idPalabraActual].length ; i++)
  {
    const elementoChar = document.querySelector("span[data-word='" + idPalabraActual + "'] span[data-char='" + i + "']");

    if (resaltar) elementoChar.classList.add("palabra-actual");
    else          elementoChar.classList.remove("palabra-actual");
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
    iptTexto.classList.add("input_correcto");
    iptTexto.classList.remove("input_incorrecto");
  }
  else
  {
    iptTexto.classList.remove("input_correcto");
    iptTexto.classList.add("input_incorrecto");
  }
}


function ResetInput()
{
  iptTexto.placeholder = palabras[idPalabraActual];
  iptTexto.value = "";
}


function BloquearInput()
{
  iptTexto.readOnly = true;
  iptTexto.value = "";
  iptTexto.placeholder = "¡Fin del juego!";
}


function MostrarPPM(ppm)
{
  optPpm.innerHTML = ppm.toString() + " ppm";
}


function MostrarProgreso(progreso)
{
  optProgreso.innerHTML = progreso + "%";
  document.documentElement.style.setProperty('--progreso', progreso + "%");
}


function ActualizarOleada()
{
  const elementoChar = document.querySelector("span[data-gchar='" + idCharCarga + "']");
  elementoChar.classList.add("p-oleada");
}


function AvanzarChispa(chispa)
{
  chispa.classList.remove("p-oleada");
  chispa.classList.add("l-chispa");
}


function PrenderPalabra(chispa)
{
  const charsPorExplotar = chispa.parentNode.querySelectorAll("span");

  for (var i = 0 ; i < charsPorExplotar.length ; i++)
  {
    charsPorExplotar[i].classList.remove("p-oleada");
    charsPorExplotar[i].classList.add("l-sin-quemar");
  }
}


function QuemarMecha(porQuemar)
{
  porQuemar.classList.remove("l-chispa");
  if (!porQuemar.dataset.space)
  {
    porQuemar.classList.add("l-quemada");
  }
}


function ExplosionarAnterior(porQuemar, chispa)
{
  const porExplosionar = porQuemar.parentNode;
  var   leftOffset = (parseInt(porExplosionar.dataset.length) / 2) - 2;
    if (leftOffset < 0) leftOffset = 0;

  document.documentElement.style.setProperty('--mitad-palabra', leftOffset + "ch");
  console.log(getComputedStyle(document.documentElement).getPropertyValue('--mitad-palabra'));
  porExplosionar.classList.add("p-explosion");
}


function ExplosionarUltima(chispa)
{
  chispa.parentNode.classList.add("p-explosion");
}


function MostrarResultados(progreso, ppm, perErrores)
{
  document.getElementById("resultados_dificultad").innerHTML  = dificultad.nombre;
  document.getElementById("resultados_progreso").innerHTML    = progreso + "%";
  document.getElementById("resultados_ppm").innerHTML         = ppm;
  document.getElementById("resultados_errores").innerHTML     = errores;
  document.getElementById("resultados_per-errores").innerHTML = perErrores.toFixed(2) + "%";
}
