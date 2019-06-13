const axios = require ('axios');
const {Points} = require( '../constants/points');

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
              'Y','Y', 'Z', 'K', 'Y']

BoardController = {
  shuffle : (array) => {
    for(let i = array.length - 1; i > 0; i--) {
      let rand = Math.floor((Math.random() * 1000)) % i;
      [array[i], array[rand]] = [array[rand], array[i]];
    }
  },

  checkWord : (req, res, next) => {

    axios.get("https://montanaflynn-spellcheck.p.rapidapi.com/check/", {
      params: {
        text: req.body.words2check
      },
      headers: {
        "X-RapidAPI-Host" : "montanaflynn-spellcheck.p.rapidapi.com",
        "X-RapidAPI-Key" : "b5652f6d96msh5577dff79174606p1c5974jsnfaf97e6e031d"
      }
    })
    .then(response => {
      console.log(response);
      if (Object.keys(response.data.corrections).length > 0) {
        res.locals.errorType = "Mismatch";
        return next(res.locals.errrorType);
      }
      res.locals.words = response.data.original;
      return next();
    })
    .catch(error => console.log(error))
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
    // console.log(res.locals.words)
    let words = res.locals.words.replace(/\s+/g, '');
    words = words.split('');
    // console.log('this is the words', words);
    let sum = 0;
    words.forEach(el => { 
      sum += Points[el.toUpperCase()]
    })
    res.locals.sum = sum;
    // console.log(sum);
    return next ();
  }
};



BoardController.shuffle(pool);




module.exports = BoardController;
