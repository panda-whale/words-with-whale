
const availableColors = ['red', 'yellow', 'blue', 'green'];

const players = {'red': null, 'blue': null, 'yellow': null, 'green': null};

let PlayerController = {
  addPlayer: (socket) => {

    let color = availableColors.pop();

    if(!color) return socket.disconnect(); //if no available colors, disconnect player

    players[color] = socket;
    socket.emit('color', color);
  },
};

module.exports = PlayerController;
