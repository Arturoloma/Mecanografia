
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

var indexOfprimerCuarto = Math.floor((palabras.length)/4);
var index01 = indexOfprimerCuarto;
var indexOfsegundoCuarto = Math.floor((palabras.length)/2);
var index02 = indexOfsegundoCuarto-indexOfprimerCuarto;
var indexOftercerCuarto = Math.floor(3*(palabras.length)/4);
var index03 = indexOftercerCuarto-indexOfsegundoCuarto;
var indexOfcuartoCuarto = Math.floor(palabras.length-1);
var index04 = indexOfcuartoCuarto-indexOftercerCuarto;

/* Desaparecer texto*/

var interruptordesaparecer = false;

function desaparecerTexto(i, ln, index, ms){
  (function theLoop (a) {
    if (interruptordesaparecer == false){                                       // Si la palabra por la que va el usuario es la que está desapareciendo, se apaga la función desaparecerTexto
      setTimeout(function() {                                                   // i = Indice de la palabra en el array palabras
        ln = ln + palabras[i].length+1;                                         // ln = Longitud de "avance". Se actualiza sumando el número de caracteres de las palabras del array palabras
        var textcambiado = refTextoString.substring(0,ln);                      // Texto desde 0 hasta el número de caracteres = suma de los caracteres de las palabras que se han ido borrando
        var textnocambiado = refTextoString.substring(ln,refTextoString.length);  // El resto del texto, que no tiene que borrarse

        refTexto.innerHTML="<span class='trans'>" + textcambiado + "<img class='anime' src='./Images/boom.png' width='20' height='20' alt='X'></span>" + textnocambiado;

  /* Control de error que te para si has llegado a la palabra que ha desaparecido */

          if (palabraActualId<=i){                                              // Si cuando se termina la fase el usuario no ha llegado a la última palabra del primer cuarto del texto, se para el tiempo y se le informa de que está eliminado
            alert("Estás eliminado.");                                          // Informe de eliminación
            interruptortimer = false;                                           // Para el interruptor
            iptTexto.readOnly = true;                                           // Evita que puedas seguir escribiendo una vez estás eliminado
            interruptordesaparecer = true;                                      // Para la función desaparecerTexto () si estás eliminado
          }

        i++;                                                                    // Hago avanzar el index de uno en uno para que vaya recorriendo el array de palabras
        if (--a) {                                                              // Si a > 0, sigue
          theLoop(a);                                                           // Llama al bucle otra vez y le pasa el valor actual de a
        }
      }, ms);                                                                   // Ms de delay en cada vuelta del bucle (en setTimeout). nº palabras (22)/tiempo para hacerlas desaparecer (13s) = 590ms
    }
  })(index);                                                                    // Veces que quiero que se repita el bucle, tantas como palabras he de hacer desaparecer
}

/* Calcular los caracteres avanzados por cada tormenta */

function caracteresavanzados(b, index){
  var long=0;
  for(a=b; a<=index; a++){
    long = long + palabras[a].length+1;
  }
  return long;
}


/* -- La zona -- */

function zona(){
  var tiempoActual = document.getElementById('timer').innerHTML;

  /* PRIMERA FASE -- Dificultad baja */
  /* Al llegar a este tiempo, empieza a desaparecer el primer cuarto del texto */

  if (tiempoActual == "2:47"){
    alert("Avanza la tormenta");

    desaparecerTexto(0, 0, index01, 590);
  }

  if (tiempoActual == "2:33"){
    alert("Fin de la primera fase");
  }

  /* SEGUNDA FASE -- Dificultad media-baja */
  /* Al llegar a este tiempo, empieza a desaparecer el segundo cuarto del texto */

  if (tiempoActual == "2:09"){
    alert("Avanza la tormenta");

    var ln = caracteresavanzados(0, indexOfprimerCuarto-1);
    desaparecerTexto(indexOfprimerCuarto, ln, index02, 676);
  }


  if (tiempoActual == "1:35"){
    alert("Fin de la segunda fase");
  }

  /* TERCERA FASE -- Dificultad media-alta */
  /* Al llegar a este tiempo, empieza a desaparecer el tercer cuarto del texto */

  if (tiempoActual == "1:16"){
    alert("Avanza la tormenta");
    ln = caracteresavanzados(0, indexOfsegundoCuarto-1);
    desaparecerTexto(indexOfsegundoCuarto, ln, index03, 575);
  }

  if (tiempoActual == "0:36"){
    alert("Fin de la tercera fase");
  }

  /* CUARTA FASE -- Dificultad alta */
  /* Al llegar a este tiempo, empieza a desaparecer el cuarto cuarto del texto */

  if (tiempoActual == "0:27"){
    alert("Avanza la tormenta");
    ln = caracteresavanzados(0, indexOftercerCuarto-1);
    desaparecerTexto(indexOftercerCuarto, ln, index04, 814);
  }

  if (tiempoActual == "0:00"){
    alert("FIN DE JUEGO");
  }

  /* Fin de la cuarta fase -- Dificultad alta */
}
