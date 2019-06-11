const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const BoardController = require('./controllers/BoardController');

app.use(bodyParser.json());


const server = require('http').createServer(app);
const io = require('socket.io')(server);

const pool = ['A','A','A','A','A',
              'A','A','A','A', 'B',
              'B', 'C', 'C', 'D', 'D',
              'D', 'D', 'E', 'E', 'E',
              'E','E','E','E','E',
              'E','E','E','E','F',
              'F', 'G', 'G', 'G', 'H',
              'H', 'I','I','I','I',
              'I','I','I','I','I',
              'J', 'K', 'L','L','L',
              'L','M','M','N','N',
              'N','N','N','N', 'O',
              'O','O','O','O','O',
              'O','O', 'P', 'P', 'Q',
              'R', 'R','R','R','R',
              'R', 'S','S','S','S',
              'T','T','T','T','T',
              'T','U','U','U','U',
              'V', 'V', 'W','W','X',
              'Y','Y', 'Z', 'K', 'Y'];

function shuffle(array) {

  for(let i = array.length - 1; i > 0; i--) {
    let rand = Math.floor((Math.random() * 1000)) % i;
    [array[i], array[rand]] = [array[rand], array[i]];
  }

}

shuffle(pool);

// console.log(pool);

const points = {
  'A' : 1,
  'E' : 1,
  'I' : 1,
  'O' : 1,
  'U' : 1,
  'L' : 1,
  'N' : 1,
  'S' : 1,
  'T' : 1,
  'R' : 1,
  'D' : 2,
  'G' : 2,
  'B' : 3,
  'C' : 3,
  'M' : 3,
  'P' : 3,
  'F' : 4,
  'H' : 4,
  'V' : 4,
  'W' : 4,
  'Y' : 4,
  'K' : 5,
  'J' : 8,
  'X' : 8,
  'Q' : 10,
  'Z' : 10
}



app.post('/isWord', BoardController.checkWord,  (req, res) => {
  res.send();
}); // should receive array of potential words

io.on('connection', () => {console.log('I AM CONNECTED!')});


server.listen(3000, () => console.log('SERVER IS CONNECTED ON 3000'));
