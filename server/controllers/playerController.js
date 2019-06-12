
const availableColors = ['red', 'yellow', 'blue', 'green'];

const players = {'red': null, 'blue': null, 'yellow': null, 'green': null};

let turn = 'green';

let PlayerController = {
  addPlayer: (socket) => {

    let color = availableColors.pop();

    if(!color) return socket.disconnect(); //if no available colors, disconnect player

    players[color] = socket;
    socket.emit('color', color);

    socket.on('test', (testdata) => console.log(color + '\'s data is: ' + testdata));
  },
  arrayOfPlayers: () => {
    return Object.entries(players).reduce((acc, ele) => {
      if(ele[1]) acc.push(ele[0]);
      return acc;
    }, []);
  },
  playerConnect: (io) => {
    const allPlayers = PlayerController.arrayOfPlayers();
    //console.log(allPlayers);
    io.emit('playerConnect', allPlayers);
  },
  getPlayers: () => players,

  changeTurn: (io) => {
    const allPlayers = PlayerController.arrayOfPlayers();
    const i = allPlayers.indexOf(turn);
    turn = allPlayers[(i+1) % allPlayers.length]; 
    io.emit('changeTurn', turn)
  },
  
};

module.exports = PlayerController;
