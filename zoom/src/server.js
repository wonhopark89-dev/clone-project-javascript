import express from 'express';

const app = express();

console.log('hello..');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public')); // only for front-end
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/')); // only use one directory

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000);
