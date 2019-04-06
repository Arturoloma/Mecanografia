const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {

  console.log('Someone connected');
  sock.emit('message', 'Hi, you are connected'); /*Manda el mensaje solo al cliente que manda el mensaje */

  sock.on('message', (text) => {
    io.emit('message', text); /*Manda el mensaje a todos los conectados, incluido el que emite el mensaje*/

  });

});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(8080, () => {
  console.log('RPS started on 8080');
});
