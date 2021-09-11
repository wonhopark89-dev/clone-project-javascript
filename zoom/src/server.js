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
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit('welcome');
  });
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => socket.to(room).emit('bye'));
  });
  socket.on('new_message', (msg, room, done) => {
    socket.to(room).emit('new_message', msg);
    done();
  });
});

// wsServer.on('connection', (socket) => {
//   // console.log(socket);
//   socket.onAny((event) => console.log(`Socket Event: ${event}`));
//   socket.on('enter_room', roomName, done => {
//     console.log(roomName);
//     // 마지막 args 는 함수, 보안상 서버에서 실행시켜주는 함수가 아님, 프론트에서 실행
//     socket.join(roomName);
//     done();
//     socket.to(roomName).emit('welcome');
//   });
//   socket.on('disconnecting', () => {
//     console.log('disconnected....');
//     socket.rooms.forEach((room) => socket.to(room).emit('bye'));
//   });
//   socket.on('new_message', (msg, room, done) => {
//     console.log(msg, room, done);
//     socket.to(room).emit('new_message', msg);
//     done();
//   });
// });

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
