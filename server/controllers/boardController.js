const axios = require ('axios');
const {Points} = require( '../constants/points');
const spell = require('spell-checker-js');
spell.load('en');

const LOBBY = 0;
const GAME_STARTED = 1;

let gamePhase = LOBBY;
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

BoardController = {
  shuffle : (array) => {
    for(let i = array.length - 1; i > 0; i--) {
      let rand = Math.floor((Math.random() * 1000)) % i;
      [array[i], array[rand]] = [array[rand], array[i]];
    }
  },

  checkWord : (req, res, next) => {
    // console.log(req.body.words);
    const check = spell.check(req.body.words.join(' '));
    console.log('this is chekc', check);

    console.log(check.length)
    if (check.length > 0){ // something was not spelled correctly
      res.locals.errorType = "Mismatch";
      return next(res.locals.errorType);
    }
    // console.log('passed it')
    // all checks out!
    // send new tiles to user
    res.locals.newTiles = BoardController.getTiles(req.body.usedTiles.length);
    // console.log(res.locals.newTiles)

    return next();

  },

  getGamePhase: () => gamePhase,

  startGame: () => {
    gamePhase = GAME_STARTED;
  },

  getTiles: (n) => {
    const tiles = [];
    for(let i = 0; i < n; i++) {
      const letter = pool.pop();
      tiles.push({letter, points: Points[letter]});
    }
    return tiles;
  },

  mulligan: (tiles) => {
    // console.log(pool.length);
    for(let i = 0; i < tiles.b.length; i++) {
      pool.push(tiles.b[i].letter);
    }
    BoardController.shuffle(pool);
    // console.log('this is after forloop', pool.length); this works!!!
    return BoardController.getTiles(7)
  
  },

  calculateScore: (req, res, next) => {
    // console.log(req.body.words)
    let words = req.body.words.join('');
    words = words.split('');
    // console.log('this is the words', words);

    let sum = 0;
    words.forEach(el => {
      sum += Points[el.toUpperCase()]
    })
    res.locals.sum = sum;
    // console.log('this is the calculated sum', sum);
    return next ();
  }
};



BoardController.shuffle(pool);




module.exports = BoardController;
