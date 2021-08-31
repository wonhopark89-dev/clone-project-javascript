const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');

function backendDone(msg) {
  console.log(`The backend says: `, msg);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  // point 1: custom event
  // point 2: can use js object or function on params/args
  // last args should be function
  socket.emit('enter_room', { payload: input.value }, backendDone); // send args, can send js object
  input.value = '';
}

form.addEventListener('submit', handleRoomSubmit);

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
