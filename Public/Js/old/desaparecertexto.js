const refTextoString = "En la actualidad, en lengua española, se utilizan los términos mecanógrafo y mecanógrafa para denominar a personas con conocimientos de mecanografía, es decir que, con soltura (a alta velocidad, sin necesidad de mirar el teclado) son capaces de introducir texto en una máquina de escribir. Además la mecanografía es una asignatura que por lo general suele impartirse a jóvenes que cursan la secundaria. En algunas escuelas esta disciplina incluye taquigrafía: taquimecanografía. Entre otros ejercicios que se realizan en la clase de mecanografía, se emprenden prácticas de tres quintetos, hojas enteras, etc.";
const palabras = refTextoString.match(/\S+/gi);                                 // Con esto evitamos obtener " xxxx" o " " como una palabra en caso de encontrar más de un espacio seguido con .split()
const refTexto = document.getElementById("ref-texto");                          // Elemento del texto de referencia
const iptTexto = document.getElementById("ipt-texto");

var indexOfprimerCuarto = Math.floor((palabras.length)/4);

desaparecerTexto();

function desaparecerTexto() {
  var ln = 0;
  for (a=0; a<=indexOfprimerCuarto; a++){
    ln = ln + palabras[a].length+1;
    var textcambiado = refTextoString.substring(0,ln);
    var textnocambiado = refTextoString.substring(ln,refTextoString.length);
    
    refTexto.innerHTML = "<span class='trans'>" + textcambiado + "</span>" + textnocambiado;
  }
    setTimeout(desaparecerTexto, 630);
}
