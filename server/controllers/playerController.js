
const colors = ['Red', 'Yellow', 'Blue', 'Green'];

const players = [];

let PlayerController = {
  addPlayer: (req, res, next) => {
    res.locals.color = colors[players.length];
    players[players.length] = colors[players.length];
  }
};

module.exports = PlayerController;