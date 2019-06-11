const axios = require ('axios');
const points = require( '../constants/points');

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
      return next();
    })
    .catch(error => console.log(error))
  }
};



BoardController.shuffle(pool);




module.exports = BoardController;