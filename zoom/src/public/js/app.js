const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;

let roomName = '';

function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('input');
  const value = input.value;
  socket.emit('new_message', input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = '';
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector('form');
  form.addEventListener('submit', handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  // point 1: custom event
  // point 2: can use js object or function on params/args
  // last args should be function
  socket.emit('enter_room', input.value, showRoom); // send args, can send js object
  roomName = input.value;
  input.value = '';
}

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', () => {
  console.log('app on');
  addMessage('someone joined !');
});
socket.on('bye', () => {
  console.log('app bye');
  addMessage('someone left..');
});
socket.on('new_message', (msg) => addMessage(msg));

// -------------------------------------------------
/**
 * only websocket
 */

// const messageList = document.querySelector('ul');
// const nickForm = document.querySelector('#nickname');
// const messageForm = document.querySelector('#message');

// const socket = new WebSocket(`ws://${window.location.host}`);

// function makeMessage(type, payload) {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// }

// socket.addEventListener('open', () => {
//   console.log('Connected to Server ✅');
// });

// socket.addEventListener('message', (message) => {
//   // create li
//   const li = document.createElement('li');
//   li.innerText = message.data;
//   messageList.append(li);
// });

// socket.addEventListener('close', () => {
//   console.log('Disonnected from Server ❌');
// });

// // setTimeout(() => {
// //   socket.send('hihi');
// // }, 2000);

// function handleSubmit(event) {
//   event.preventDefault();
//   const input = messageForm.querySelector('input');
//   socket.send(makeMessage('new_message', input.value));
//   input.value = '';
// }

// function handleNickSubmit(event) {
//   event.preventDefault();
//   const input = nickForm.querySelector('input');
//   socket.send(makeMessage('nickname', input.value));
//   input.value = '';
// }

// messageForm.addEventListener('submit', handleSubmit);
// nickForm.addEventListener('submit', handleNickSubmit);
