
// VAR GLOBALES
var refTextoString = "En la actualidad"/*, en lengua española, se utilizan los términos mecanógrafo y mecanógrafa para denominar a personas con conocimientos de mecanografía, es decir que, con soltura (a alta velocidad, sin necesidad de mirar el teclado) son capaces de introducir texto en una máquina de escribir. Además la mecanografía es una asignatura que por lo general suele impartirse a jóvenes que cursan la secundaria. En algunas escuelas esta disciplina incluye taquigrafía: taquimecanografía. Entre otros ejercicios que se realizan en la clase de mecanografía, se emprenden prácticas de tres quintetos, hojas enteras, etc."*/;
var palabras = refTextoString.match(/\S+/gi);           // Con esto evitamos obtener " xxxx" o " " como una palabra en caso de encontrar más de un espacio seguido con .split()
var palabraActualId = 0;                                // Id de la palabra que el jugador tiene que escribir
var refTexto = document.getElementById("ref-texto");    // Elemento del texto de referencia
var iptTexto = document.getElementById("ipt-texto");    // Elemento del input para el usuario

refTexto.innerHTML = refTextoString;                    // Asignación del texto al elemento del texto de referencia
iptTexto.placeholder = palabras[palabraActualId];       // Placeholder de la palabra que tienes que escribir

// FUNCIONES
function GameManager(event)
{
  var x = event.which || event.keyCode;                 // Utilizar which o keyCode, dependiendo de cuál soporte el navegador
  var subIpt = iptTexto.value;
  var subRef = palabras[palabraActualId].substring(0,subIpt.length);
  var iptCorrecto = false;
  // Si el usuario ha presionado la barra espaciadora, comprobamos si podemos pasar a la siguiente palabra
  if (x === 32)
  {
    subIpt = subIpt.substring(0,subIpt.length-1);
    iptTexto.value = subIpt;

    iptCorrecto = Comparacion(subIpt, subRef);
    EstiloInput(iptCorrecto);
    if (iptCorrecto)
    {
      if (GameOver() === false)
      {
        AvanzarPalabra();
        CalcularPPM();
        ResetInput();
      }
      else
      {
        ResetInput();
        alert("FIN");
      }
    }
  }
  // Si no, comprobamos si el input que hay hasta ahora es correcto
  else
  {
    iptCorrecto = Comparacion(subIpt, subRef);
    EstiloInput(iptCorrecto);
  }
}

function Comparacion(subIpt, subRef)
{
  if (subIpt === subRef) { return true;  }
  else                   { return false; }
}

function GameOver()
{
  if (palabraActualId === palabras.length-1) { return true;  }
  else                                       { return false; }
}

function AvanzarPalabra()
{
  palabraActualId += 1;
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
