"use strict"
var socket=io.connect();
var usuario;
var data;
var progress;
var player;
var enemigo;
//Captura el usuario
function usuario(){
  usuario=document.getElementById("nombre").value;
}

//Envia su progreso al servidor
function enviar(){
      progress=CalcularProgreso(progreso);
      data=[usuario,progress];
      socket.emit("start",data);
    }
//Lo envia cada segundo
setInterval(enviar,1000);


//Recibe el porgreso al servidor y filtra el usuario que no seael mismo
socket.on("envioProgreso",function(datos){
  if (datos[0]!=usuario){
    enemigo=datos[1];
    document.getElementById("opt-progreso-multi").innerHTML=enemigo+"%";
    document.documentElement.style.setProperty('--progreso-multi', enemigo + "%");
  }
});
