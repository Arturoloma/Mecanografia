
// CONSTANTES GLOBALES
const refTextoString = "En la actualidad, en lengua española, se utilizan los términos mecanógrafo y mecanógrafa para denominar a personas con conocimientos de mecanografía, es decir que, con soltura (a alta velocidad, sin necesidad de mirar el teclado) son capaces de introducir texto en una máquina de escribir. Además la mecanografía es una asignatura que por lo general suele impartirse a jóvenes que cursan la secundaria. En algunas escuelas esta disciplina incluye taquigrafía: taquimecanografía. Entre otros ejercicios que se realizan en la clase de mecanografía, se emprenden prácticas de tres quintetos, hojas enteras, etc.";
const palabras = refTextoString.match(/\S+/gi);                                 // Con esto evitamos obtener " xxxx" o " " como una palabra en caso de encontrar más de un espacio seguido con .split()
const refTexto = document.getElementById("ref-texto");                          // Elemento del texto de referencia
const iptTexto = document.getElementById("ipt-texto");                          // Elemento del input para el usuario
const optPpm = document.getElementById("opt-ppm");                              // Elemento de output de pulsaciones correctas por minuto
const optProgreso = document.getElementById("opt-progreso");                    // Elemento de output de progreso actual
const tIni = new Date();                                                        // Momento de inicio del juego

// VAR GLOBALES
var palabraActualId = 0;                                                        // Id del array de la palabra que el jugador tiene que escribir
var refPalabraActualId = 0;                                                     // Id del primer caracter de la palabra actual dentro de la variable del texto completo
var charCorrectos = 0;                                                          // Número de caracteres introducidos correctamente

// INICIALIZACIÓN
Start();

// FUNCIONES
function Start()
{
  refTexto.innerHTML = refTextoString;                                          // Asignación del texto al elemento del texto de referencia
  iptTexto.placeholder = palabras[palabraActualId];                             // Placeholder de la palabra que tienes que escribir
  ResaltarPalabra();                                                            // Resalte de la primera palabra
}

function GameManager()
{
  var subIpt = iptTexto.value;                                                  // Lo que ha escrito el usuario
  var subRef = palabras[palabraActualId].substring(0,subIpt.length);            // Substring de la palabra actual del mismo largo que lo que lleva escrito el usuario
  var iptCorrecto = false;
  var ppm = 0;                                                                  // Pulsaciones por minuto
  var charCorrectosAdd = 0;                                                     // Número de caracteres que se han introducido correctamente en la última palabra y que hay que añadir a la cuenta

  // Si es la última palabra, comprobamos si es fin del juego
  if (palabraActualId === palabras.length-1)
  {
    subIptCorrecto = Comparacion(subIpt, subRef);
    EstiloInput(subIptCorrecto);
    iptCorrecto = Comparacion(subIpt, palabras[palabraActualId]);
    if (iptCorrecto)
    {
      charCorrectosAdd = subIpt.length;
      ppm = CalcularPPM(charCorrectosAdd);
      MostrarPPM(ppm);
      var progreso = CalcularProgreso();
      MostrarProgreso(progreso);
      ResetInput();
      iptTexto.placeholder = "¡COMPLETADO!";
      iptTexto.readOnly = true;
    }
  }
  else
  {
    // Si el usuario ha presionado la barra espaciadora, comprobamos si podemos pasar a la siguiente palabra
    if (subIpt.charAt(subIpt.length-1) === " ")                                 // Si el último caracter es un espacio //
    {
      subIpt = subIpt.substring(0,subIpt.length-1);                             //Guardo lo que ha introducido el usuario sin el espacio, que es el último caracter //
      iptTexto.value = subIpt;                                                   // Si se ha equivocado y ha metido un espacio donde no iba, se borra automáticamente, no tiene que corregirlo //

      iptCorrecto = Comparacion(subIpt, subRef);
      EstiloInput(iptCorrecto);
      if (iptCorrecto)
      {
        charCorrectosAdd = subIpt.length + 1;                                   // Añado 1 por el " " que he quitado anteriormente
        AvanzarPalabra(charCorrectosAdd);
        ResaltarPalabra();
        ppm = CalcularPPM(charCorrectosAdd);
        MostrarPPM(ppm);
        var progreso = CalcularProgreso();
        MostrarProgreso(progreso);
        ResetInput();
      }
    }
    // Si no, comprobamos si el input que hay hasta ahora es correcto
    else
    {
      iptCorrecto = Comparacion(subIpt, subRef);
      EstiloInput(iptCorrecto);
    }
  }
}

function Comparacion(subIpt, subRef)
{
  if (subIpt === subRef) { return true;  }
  else                   { return false; }
}

function AvanzarPalabra(charCorrectosAdd)
{
  palabraActualId += 1;                                                         // Sumamos uno al index en el array de palabras para poder hacer las comparaciones (la lógica general)
  refPalabraActualId += charCorrectosAdd;                                       // Avanzamos según el número de caracteres para poder resaltar la palabra que toca (cuando usamos el texto completo)
  // Prevención de espacios consecutivos que alterarían el correcto índice de comienzo de la palabra actual en el texto de referencia
  var refPalabraActualIdEsEspacio = false;
  do  {
    if (refTextoString.charAt(refPalabraActualId) === " ")
    {
      refPalabraActualId++;
      refPalabraActualIdEsEspacio = true;
    }
    else
    {
      refPalabraActualIdEsEspacio = false;
    }
  } while (refPalabraActualIdEsEspacio === true);
}

function ResaltarPalabra()
{
  var refTextoIni = refTextoString.substring(0, refPalabraActualId);
  var refTextoActual = refTextoString.substring(refPalabraActualId, refPalabraActualId + palabras[palabraActualId].length);
  var refTextoFin = refTextoString.substring(refPalabraActualId + palabras[palabraActualId].length, refTextoString.length);

  refTexto.innerHTML = refTextoIni + "<span class='palabra-actual'>" + refTextoActual + "</span>" + refTextoFin;
}

function CalcularPPM(charCorrectosAdd)
{
  var tNow = new Date();
  var tTotal = (tNow.getTime() - tIni.getTime()) / 1000 / 60;                   // getTime() devuelve el tiempo desde 1970 en ms. Divido entre 1000 para convertir a segundos y entre 60 para convertir a mins.
  charCorrectos += charCorrectosAdd;
  return Math.abs(Math.floor(charCorrectos / tTotal));                          // Math.floor() corta los decimales (redondea a la baja)
}

function MostrarPPM(ppm)
{
  optPpm.innerHTML = ppm.toString() + " ppm";
}

function CalcularProgreso()
{
  return Math.floor(100*((charCorrectos) / refTextoString.length));
}

function MostrarProgreso(progreso)
{
  optProgreso.innerHTML = progreso + "%";
}

function ResetInput()
{
  iptTexto.placeholder = palabras[palabraActualId];
  iptTexto.value = "";
}

function EstiloInput(iptCorrecto)
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


/* Prototipo BR */

/* -- Cronómetro -- */
var interruptortimer = true;

document.getElementById('timer').innerHTML =  03 + ":" + 00;
startTimer();

function startTimer() {
  if (interruptortimer == true){                                                // El interruptor apaga el cronómetro al llegar al 0:00
    var presentTime = document.getElementById('timer').innerHTML;               // Saca del html el tiempo total del cronómetro, en este caso, 3 minutos y 00 segundos
    var timeArray = presentTime.split(/[:]+/);                                  // Introduce en un array el tiempo presente dividido en minutos (timeArray[0]) y segundos (timeArray[1])
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));                                    // Va restando 1 a los segundos
    if(s==59){m=m-1}                                                            // Si los segundos vuelven a 59, resta 1 a los minutos
    if(m==0 & s==0){                                                            // Si hemos llegado a 0 minutos y 0 segundos, se apaga el cronómetro
      interruptortimer = false;
    }

    document.getElementById('timer').innerHTML =  m + ":" + s;                  // Actualiza el tiempo en el html
    setTimeout(startTimer, 1000);                                               // Marca la velocidad a la que transcurre la función. 1000ms = 1s
    zona();
  }
}


function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec};                                  // Añade un 0 a los segundos menores de 10
  if (sec < 0) {sec = "59"};                                                    // Cuando los segundos llegan a 0, los vuelve a poner en 59
  return sec;
}


/* -- La zona -- */

function zona(){
  var tiempoActual = document.getElementById('timer').innerHTML;

  var indexOfprimerCuarto = Math.floor((palabras.length)/4);
  var indexOfsegundoCuarto = Math.floor((palabras.length)/2);
  var indexOftercerCuarto = Math.floor(3*(palabras.length)/4);
  var indexOfcuartoCuarto = Math.floor(palabras.length-1);

  /*Al llegar a este tiempo, empieza a desaparecer el primer cuarto del texto */
  if (tiempoActual == "2:47"){
    alert("Avanza la tormenta");
  }

  if (tiempoActual == "2:33"){
    alert("Fin de la primera fase");
    for (a = 0; a<=indexOfprimerCuarto; a++){
      if (palabraActualId<=a){
          alert("Estás eliminado.");
      }
    }
  }


  if (tiempoActual == "2:09"){
    alert("Avanza la tormenta");
  }

  if (tiempoActual == "1:35"){
    alert("Fin de la segunda fase");
    for (a = indexOfprimerCuarto; a<=indexOfsegundoCuarto; a++){
      if (palabraActualId<=a){
          alert("Estás eliminado.");
      }
    }
  }

  if (tiempoActual == "1:16"){
    alert("Avanza la tormenta");
  }

  if (tiempoActual == "0:36"){
    alert("Fin de la tercera fase");
    for (a = indexOfsegundoCuarto; a<=indexOftercerCuarto; a++){
      if (palabraActualId<=a){
          alert("Estás eliminado.");
      }
    }
  }

  if (tiempoActual == "0:27"){
    alert("Avanza la tormenta");
  }

  if (tiempoActual == "0:00"){
    alert("FIN DE JUEGO");
    for (a = indexOftercerCuarto; a<=indexOfcuartoCuarto; a++){
      if (palabraActualId<=a){
          alert("Estás eliminado.");
      }
    }
  }
}
