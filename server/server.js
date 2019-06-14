const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const BoardController = require('./controllers/boardController');
const PlayerController = require('./controllers/playerController');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Server helpers here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  return next();
});


//Request chain for checking words
app.post('/isWord', BoardController.checkWord, BoardController.calculateScore, PlayerController.sendNewTiles, (req, res) => {
  io.emit('updateBoard', req.body.board);
  io.emit('addPoints', {player: req.body.color, points: res.locals.sum})
  PlayerController.changeTurn(io);
  res.send({message: 'i am success', score: res.locals.sum });
}); // should receive array of potential words

//////////////////////////////////////////////////////////////////////
/*
app.post('/isWord', BoardController.checkWord, BoardController.calculateScore, (req, res) => {
 res.send({score: res.locals.sum});
}); // should receive array of potential words
*/


if(process.env.NODE_ENV === 'production') {
  // serve index.html in prod mode
  app.get('/', (req, res) => res.sendFile(path.resolve(__dirname+'/../index.html')));

  // serve the bundle
  app.use('/build', express.static(path.join(__dirname, '../build')));
}

app.use((err, req, res, next) => {
  console.log("i caught a baddie");
  let type = res.locals.errorType;
  switch(type) {
    case 'Mismatch':
      return res.status(500).send({err})
    default:

  }
})



io.on('connection', (socket) => {
  console.log('SOCKET CONNECTED!');

  if(BoardController.getGamePhase() === 0) {
    PlayerController.addPlayer(socket);
    PlayerController.playerConnect(io);

    socket.on('gameStart', () => { // for when user sends Game Start from Lobby Screen
      //start Game
      BoardController.startGame();
      // send initial tiles to players
      const players = PlayerController.getPlayers();

      for(let key in players) {
        if(players[key]) {
          // create and send 7 tiles
          players[key].emit('initGame', { tiles: BoardController.getTiles(7),
                                          turn: 'green'});
        }
      }
    });

    socket.on('getTiles', (data) => {
      const players = PlayerController.getPlayers();
      let appendTile = BoardController.mulligan(data);
      players[data.c].emit('mulliganTiles', appendTile);
    });

    socket.on('pass', () => { // listener for turn pass
      console.log('server received pass message');
      PlayerController.changeTurn(io);
    })

  }
  if(BoardController.getGamePhase() !== 0) {
    socket.disconnect();
  }
});


server.listen(3000, () => console.log('SERVER IS CONNECTED ON 3000'));
