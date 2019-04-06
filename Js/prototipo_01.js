
// VAR GLOBALES
var refTextoString = "En la actualidad, en lengua española, se utilizan los términos mecanógrafo y mecanógrafa para denominar a personas con conocimientos de mecanografía, es decir que, con soltura (a alta velocidad, sin necesidad de mirar el teclado) son capaces de introducir texto en una máquina de escribir. Además la mecanografía es una asignatura que por lo general suele impartirse a jóvenes que cursan la secundaria. En algunas escuelas esta disciplina incluye taquigrafía: taquimecanografía. Entre otros ejercicios que se realizan en la clase de mecanografía, se emprenden prácticas de tres quintetos, hojas enteras, etc.";
var palabras = refTextoString.match(/\S+/gi);                                   // Con esto evitamos obtener " xxxx" o " " como una palabra en caso de encontrar más de un espacio seguido con .split()
var palabraActualId = 0;                                                        // Id del array de la palabra que el jugador tiene que escribir
var refPalabraActualId = 0;                                                     // Id del primer caracter de la palabra actual dentro de la variable del texto completo
var refTexto = document.getElementById("ref-texto");                            // Elemento del texto de referencia
var iptTexto = document.getElementById("ipt-texto");                            // Elemento del input para el usuario
var optPpm = document.getElementById("opt-ppm");                                // Elemento de output de pulsaciones correctas por minuto
var tIni = new Date();                                                          // Momento de inicio del juego
var charCorrectos = 0;

refTexto.innerHTML = refTextoString;                                            // Asignación del texto al elemento del texto de referencia
iptTexto.placeholder = palabras[palabraActualId];                               // Placeholder de la palabra que tienes que escribir
ResaltarPalabra();

// FUNCIONES
function GameManager()
{
  var subIpt = iptTexto.value;
  var subRef = palabras[palabraActualId].substring(0,subIpt.length);
  var iptCorrecto = false;

  // Si es la última palabra, comprobamos si es fin del juego
  if (palabraActualId === palabras.length-1)
  {
    subIptCorrecto = Comparacion(subIpt, subRef);
    EstiloInput(subIptCorrecto);
    iptCorrecto = Comparacion(subIpt, palabras[palabraActualId]);
    if (iptCorrecto)
    {
        ResetInput();
        alert("FIN");
    }
  }
  else
  {
    // Si el usuario ha presionado la barra espaciadora, comprobamos si podemos pasar a la siguiente palabra
    if (subIpt.charAt(subIpt.length-1) === " ")
    {
      subIpt = subIpt.substring(0,subIpt.length-1);
      iptTexto.value = subIpt;

      iptCorrecto = Comparacion(subIpt, subRef);
      EstiloInput(iptCorrecto);
      if (iptCorrecto)
      {
        var charCorrectosAdd = subIpt.length + 1;                               // Añado 1 por el " " que he quitado anteriormente
        AvanzarPalabra(charCorrectosAdd);
        ResaltarPalabra();
        var ppm = CalcularPPM(charCorrectosAdd);
        MostrarPPM(ppm);
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
  palabraActualId += 1;
  refPalabraActualId += charCorrectosAdd;
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
  return Math.abs(Math.floor(charCorrectos / tTotal));
}

function MostrarPPM(ppm)
{
  optPpm.innerHTML = ppm.toString() + " ppm";
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
