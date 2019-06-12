
const availableColors = ['red', 'yellow', 'blue', 'green'];

const players = {'red': null, 'blue': null, 'yellow': null, 'green': null};

let PlayerController = {
  addPlayer: (socket) => {

    let color = availableColors.pop();

    if(!color) return socket.disconnect(); //if no available colors, disconnect player

    players[color] = socket;
    socket.emit('color', color);
  },
  playerConnect: (io) => {
    const allPlayers = Object.entries(players).reduce((acc, ele) => {
      if(ele[1]) acc.push(ele[0]);
      return acc;
    }, []);
    //console.log(allPlayers);
    io.emit('playerConnect', allPlayers);
  }
};

module.exports = PlayerController;
