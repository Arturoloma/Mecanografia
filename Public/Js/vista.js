'use strict'

/***
 * vista.js es un script de Vista destinado a mostrar los cambios de la
 * situación actual del juego.
***/




/**
 * ActibarBotonDificultad() añade la clase con los estilos de botón que ha sido
 * presionado al botón al que se haya hecho click en el panel de selección de
 * dificultad (indicado por el Controlador).
 */
function ActivarBotonDificultad(dificultadSeleccionada)
{
  // Elementos de los botones de selección de dificultad
  const btnFacil   = document.getElementById("boton_nivel_facil");
  const btnNormal  = document.getElementById("boton_nivel_normal");
  const btnDificil = document.getElementById("boton_nivel_dificil");

  // Quito la clase de botón activo de todos para ahorrarme buscar cuál lo está.
  btnFacil.classList.remove("activo");
  btnNormal.classList.remove("activo");
  btnDificil.classList.remove("activo");

  // Activo el botón que se ha presionado
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


function EstiloBotonesEnCola()
{
  const spanSingle = document.getElementById("span_single");
  var btnsDif = document.getElementsByClassName("boton_dificultad");

  for (var i = 0 ; i < btnsDif.length ; i++)
  {
    if (btnsDif[i].classList.contains("activo") === false)
    {
      var lunares = btnsDif[i].getElementsByClassName("lunares")[0].getElementsByClassName("lunar");

      btnsDif[i].style.backgroundColor = "#dedede";
      btnsDif[i].style.color = "rgb(96, 96, 96)";

      for (var j = 0 ; j < lunares.length ; j++)
      {
        lunares[j].style.backgroundColor = "rgb(128, 128, 128)";
      }
    }
    btnsDif[i].classList.remove("clickable");
  }

  spanSingle.innerHTML = "Cancelar";
  spanSingle.style.backgroundColor = "#ff6666";
  spanSingle.style.color = "white";
  document.getElementById("span_jugar").innerHTML = "Esperando a otro jugador";
  document.getElementById("nombre").readOnly = true;
}


/**
 * ActualizarCuentaAtras() escribe el número de segundos que quedan de cuenta
 * atrás en el panel de la cuenta atrás.
 */
function ActualizarCuentaAtras(numero)
{
  panelCuentaAtras.innerHTML = numero;
}


/**
 * ResaltarPalabraActual() añade el estilo de la palabra que tiene que escribir
 * el jugador a la palabra que se le indique desde el Controlador. También
 * elimina el estilo si el argumento del parámetro es false.
 */
function ResaltarPalabraActual(resaltar)
{
  // El estilo se añade caracter por caracter.
  for (var i = 0 ; i < palabras[idPalabraActual].length ; i++)
  {
    const elementoChar = document.querySelector("span[data-word='" + idPalabraActual + "'] span[data-char='" + i + "']");

    if (resaltar) elementoChar.classList.add("palabra-actual");
    else          elementoChar.classList.remove("palabra-actual");
  }
}


/**
 * MostrarInputSinEspacio() muestra la cadena de texto que contenga su parámetro,
 * que será calculada por el Controlador y consistirá en el input del usuario
 * durante el juego sin cualquier espacio que haya podido añadir.
 */
function MostrarInputSinEspacio(subIpt)
{
  iptTexto.value = subIpt;
}


/**
 * EstilizarInput() cambia el estilo del input de texto durante el juego en
 * función de si el input es correcto o no (dado por su parámetro desde el
 * Controlador).
 */
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


/**
 * ResetInput() vacía el input de texto durante el juego y actualiza su
 * placeholder para que coincida con la palabra que tiene que escribir el jugador.
 */
function ResetInput()
{
  iptTexto.placeholder = palabras[idPalabraActual];
  iptTexto.value = "";
}


/**
 * BloquearInput() bloquea el input de texto del juego. Es llamado por el
 * Controlador al final del juego para asegurar que el usuario no rompa el
 * cálculo de resultados por error en el cambio de escena.
 */
function BloquearInput()
{
  iptTexto.readOnly = true;
  iptTexto.value = "";
  iptTexto.placeholder = "¡Fin del juego!";
}


/**
 * MostrarPPM() muestra las pulsaciones por minuto calculadas en el Controlador.
 */
function MostrarPPM(ppm)
{
  optPpm.innerHTML = ppm.toString() + " ppm";
}


/**
 * MostrarProgreso() muestra el progreso (%) calculado en el Controlador.
 */
function MostrarProgreso(progreso)
{
  optProgreso.innerHTML = progreso + "%";
  document.documentElement.style.setProperty('--progreso', progreso + "%");
}


/**
 * ActualizarOleada() añade mecha a un caracter que tenga que entrar dentro de
 * la fase actual de la tormenta.
 */
function ActualizarOleada()
{
  const elementoChar = document.querySelector("span[data-gchar='" + idCharCarga + "']");
  elementoChar.classList.add("p-oleada");
}


/**
 * AvanzarChispa() mueve la chispa al caracter que toque durante la descarga de
 * la fase actual de la tormenta.
 */
function AvanzarChispa(chispa)
{
  chispa.classList.remove("p-oleada");
  chispa.classList.add("l-chispa");
}


/**
 * PrenderPalabra() da estilo de palabra a punto de explotar a la palabra en la
 * que está la chispa durante la descarga de la fase actual de la tormenta. El
 * estilo se añade caracter por caracter, quitando el de oleada que ya no sería
 * necesario.
 */
function PrenderPalabra(chispa)
{
  const charsPorExplotar = chispa.parentNode.querySelectorAll("span");

  for (var i = 0 ; i < charsPorExplotar.length ; i++)
  {
    charsPorExplotar[i].classList.remove("p-oleada");
    charsPorExplotar[i].classList.add("l-sin-quemar");
  }
}


/**
 * QuemarMecha() da estilo de mecha quemada al caracter anterior al de la
 * chispa (es decir, por donde pasa la chispa se quema la mecha).
 */
function QuemarMecha(porQuemar)
{
  porQuemar.classList.remove("l-chispa");

  // No añado estilo de mecha quemada a los espacios
  if (!porQuemar.dataset.space)
  {
    porQuemar.classList.add("l-quemada");
  }
}


/**
 * ExplosionarAnterior() hace explotar la palabra anterior a aquella en la que
 * está la chispa, puesto que toda su mecha se habría quemado.
 */
function ExplosionarAnterior(porQuemar, chispa)
{
  // Palabra que tiene que explotar
  const porExplosionar = porQuemar.parentNode;
  // Cálculo aproximado del centro de la palabra
  var   leftOffset = (parseInt(porExplosionar.dataset.length) / 2) - 2;
    if (leftOffset < 0) leftOffset = 0;

  // Actualizo la variable --mitad-palabra del CSS para que la partícula de la explosión salga en el centro de la misma.
  document.documentElement.style.setProperty('--mitad-palabra', leftOffset + "ch");
  porExplosionar.classList.add("p-explosion");
}


/**
 * ExplosionarUltima() hace explotar la última palabra. La diferenciación
 * respecto a ExplosionarAnterior() se debe a que la chispa nunca llegará a
 * salir de la última palabra porque no hay nada después de ella, así que se
 * controla excepcionalmente.
 */
function ExplosionarUltima(chispa)
{
  chispa.parentNode.classList.add("p-explosion");
}


/**
 * MostrarResultados() actualiza los valores del panel de resultados en función
 * de lo que le indique el Controlador y la configuración.
 */
function MostrarResultados(progreso, ppm, perErrores, posicion)
{
  var textoPosicion = "";
  if (posicion === 0) { textoPosicion = "¡Empate!"; }
  else                { textoPosicion = posicion + "º"; }

  document.getElementById("resultados_dificultad").innerHTML  = dificultad.nombre;
  document.getElementById("resultados_progreso").innerHTML    = progreso + "%";
  document.getElementById("resultados_ppm").innerHTML         = ppm;
  document.getElementById("resultados_errores").innerHTML     = errores;
  document.getElementById("resultados_per-errores").innerHTML = perErrores.toFixed(2) + "%";
  document.getElementById("resultado_multi").innerHTML        = textoPosicion;
}
