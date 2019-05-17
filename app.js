'use strict'
/*
const http = require('http');

const port=process.env.PORT || 3000

const server = http.createServer((req, res) => {

res.statusCode = 200;

res.setHeader('Content-Type', 'text/html');

res.end('<h1>Hello World</h1>');

});

server.listen(port,() => {

console.log(`Server running at port `+port);

});*/
//Estancias necesarias
var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require("socket.io");
var io = socket(server);
var port = process.env.PORT || 3000;
app.use(express.static('public'));

var connections=[];
var players=[];

//Cuando se conecta un usuario,se guarda en connections para saber cuantos hay en total
io.sockets.on('connection', function(socket) {
  connections.push(socket);
//recibe la informacion de jugadores
  socket.on("start",function(data){
    players=data;
    console.log("Conectados: "+players+" "+connections.length);
  });
});

//Envia el progreso recibido a todos los usuarios
function envioProgreso(){
  io.sockets.emit("envioProgreso",players);
}
//Para que lo envie cada segundo
setInterval(envioProgreso,1000);


//Escucha del server
server.listen(port, function() {
  console.log('Servidor en el ' + port);
});
