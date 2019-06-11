const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const BoardController = require('./controllers/BoardController');

app.use(bodyParser.json());


const server = require('http').createServer(app);
const io = require('socket.io')(server);

// app.get('/start', )

//Request chain for checking words
app.post('/isWord', BoardController.checkWord,  (req, res) => {
  res.send();
}); // should receive array of potential words

io.on('connection', () => {console.log('I AM CONNECTED!')});


server.listen(3000, () => console.log('SERVER IS CONNECTED ON 3000'));
