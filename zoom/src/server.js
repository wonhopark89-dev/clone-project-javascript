import http from 'http';
import SocketIO from 'socket.io';
// import WebSocket from 'ws';
import express from 'express';

const app = express();

console.log('hello..');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public')); // only for front-end
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/')); // only use one directory

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app); // http server, 필수사항 아님
const wsServer = SocketIO(httpServer);

wsServer.on('connection', (socket) => {
  console.log(socket);

  socket.on('enter_room', (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done();
    }, 2000);
  });
});

// function onSocketClose() {
//   console.log('Disconnected from the Browser ❌');
// }

// const wss = new WebSocket.Server({ server }); // socket, 같은 포트 사용하려고,
// const sockets = [];
// wss.on('connection', (socket) => {
//   sockets.push(socket);
//   socket['nickname'] = 'Anon';
//   console.log('Connected to Broswer ✅');
//   socket.on('close', onSocketClose);
//   socket.on('message', (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case 'new_message':
//         sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
//         break;
//       case 'nickname':
//         socket['nickname'] = message.payload;
//         break;
//     }
//   });
// });

httpServer.listen(3000, handleListen);
