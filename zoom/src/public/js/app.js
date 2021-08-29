const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('Connected to Server ✅');
});

socket.addEventListener('message', (message) => {
  console.log(message.data);
  // console.dir('New message:' + JSON.stringify(message));
});

socket.addEventListener('close', () => {
  console.log('Disonnected from Server ❌');
});

// setTimeout(() => {
//   socket.send('hihi');
// }, 2000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(input.value);
  input.value = '';
}
messageForm.addEventListener('submit', handleSubmit);
