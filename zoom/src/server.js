import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();

console.log('hello..');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public')); // only for front-end
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/')); // only use one directory

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); // http server, 필수사항 아님
const wss = new WebSocket.Server({ server }); // socket, 같은 포트 사용하려고,

wss.on('connection', (socket) => {
  // console.log(socket);
  console.log('Connected to Broswer ✅');
  socket.on('close', () => {
    console.log('Disconnected from the Browser ❌');
  });
  socket.on('message', (message) => {
    console.log(message.toString('utf8'));
  });
  socket.send('hello!!!');
});
server.listen(3000, handleListen);
