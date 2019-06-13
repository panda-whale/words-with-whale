import React, { Component } from "react";
import { render } from "react-dom";
import Board from "../components/Board";
import Bench from "./Bench";
import Lobby from './Lobby';
import openSocket from "socket.io-client";



  const ipAddress = "http://192.168.0.97:3000"; // Roy's
//  const ipAddress = "http://192.168.0.221:3000";
//const ipAddress = "http://192.168.0.161:3000"; //sam



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: [],
      socket: openSocket(ipAddress),
      color: null,
      turn: null,
      allPlayers: [],
      gameHasStarted: 0,
      bench: [],
      letter: {value : '', index : null},
      usedTiles: []
      }

      for (let i =0; i<15; i++) {
        let rowArr = [];
        for (let j=0; j<15; j++) {
          if (i=== 7 && j==7) {
            rowArr.push({letter:'*', points: 0})
          } else {
            rowArr.push({letter: '-', points: 0})
          }
        }
        this.state.board.push(rowArr);
      }


      // socket listeners
      this.state.socket.on('color', (color) => this.setState({...this.state, color}));
      this.state.socket.on('playerConnect', (players) => this.setState({...this.state, allPlayers: players}));
      this.state.socket.on('mulliganTiles', (tiles) => this.setState({...this.state, bench: tiles}));
      this.state.socket.on('initGame', ({tiles, turn}) => this.setState({
        ...this.state, turn, bench: tiles, gameHasStarted : 1}));
      this.state.socket.on('changeTurn', (turn) => this.setState({...this.state, turn}));
      this.state.socket.on('updateBoard', (board) => this.setState({...this.state, board}));
      // functions
      this.boardPlace = this.boardPlace.bind(this);
      this.click2StartGame = this.click2StartGame.bind(this);
      this.click2Mulligan = this.click2Mulligan.bind(this);
      this.pickLetter = this.pickLetter.bind(this);
      this.pass = this.pass.bind(this);
      this.done = this.done.bind(this);

    }
    boardPlace (e) {
      if(this.state.letter.value !== ''){
        let num = e.target.id.split(',');
        // let newBoard = this.state.board.slice();
        // console.log(this.state.board[num[0]][num[1]])
        let cord = this.state.board.slice();
        if(cord[num[0]][num[1]].letter === '-' || cord[num[0]][num[1]].letter === '*') {
          cord[num[0]][num[1]].letter = this.state.letter.value;
          cord[num[0]][num[1]].points = this.state.bench[this.state.letter.index].points; //spaghetti

          const newUsedTiles = this.state.usedTiles.slice();
          newUsedTiles.push({value: this.state.letter.value, benchId: this.state.letter.index, boardRowId: num[0], boardColId: num[1]});

          this.setState({...this.state, board:cord, letter:{value : '', index : null}, usedTiles: newUsedTiles});
          // this works
        }

      }
    }
    click2StartGame () {
      this.state.socket.emit('gameStart');
    }

    click2Mulligan () {
      // we need to send back all of state.bench to server
      // console.log('this is hittting')
      this.state.socket.emit('getTiles', {b: this.state.bench, c:this.state.color});
    }

    pickLetter (e) {
      if(this.state.letter.value !== '') {
        // click on board

        // click on bench
        //want to swap with this one.
        if(e.target.id.includes('bench_')) {
          const swapId = e.target.id.replace('bench_', '');
          const letterIndex = this.state.letter.index;
          const newBench = this.state.bench;
          [newBench[letterIndex], newBench[swapId]] = [newBench[swapId], newBench[letterIndex]];
          return this.setState({...this.state, letter:{value : '', index : null}, bench: newBench})
        }
        console.log('swapping the letter');
      } else {
        console.log('setting the letter');
        console.log(e.target.id);
        console.log(e.target.id.replace('bench_', ''));
        this.setState({...this.state, letter: { value: e.target.innerHTML, index: e.target.id.replace('bench_', '')}});
      }
    }

    pass () {
      this.state.socket.emit('pass');
    }

    done() {

      const tiles = this.state.usedTiles;

      if(tiles.length === 0) return;

      let direction;
      // arrange tiles in order
      // check if horizontal
      if(tiles.length > 1) {
        let j = tiles[0].boardColId;
        for(let i = 1; i < tiles.length; i++) {
          if(tiles[i].boardColId !== j) {//not vertical
            direction = 'horizontal';
            break;
          } else {
            direction = 'vertical'
          }
        }
      }

      //if horizontal, sort by boardColId, else sort by boardRowId
      if(direction == 'horizontal') {
        tiles.sort((a, b) => ((+a.boardColId) - (+b.boardColId)));
      } else {
        tiles.sort((a, b) => ((+a.boardRowId) - (+b.boardRowId)));
      }

      console.log(tiles);
      // traverse to be continued...

      // don't forget to consider if continue a word or appending to an existing word
      const word = tiles.reduce((acc, ele) => (acc + ele.value), '');
      console.log(word);

      fetch(ipAddress + "/isWord", {
        method: 'POST',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify({
          words: [word],
          color: this.state.color,
          usedTiles: tiles,
          board: this.state.board,
        })
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        // if response has err key then reset board/bench/app state to remove attempted word
        // else
      })
      .catch(error => console.log(error));


      // check the word upwords and downwards

    }

    render() {
        const { board, allPlayers, bench} = this.state;
        console.log(board)
        console.log(allPlayers);
        console.log(this.state.turn);
        console.log(this.state.gameHasStarted);
        if(this.state.socket)  this.state.socket.emit('test', 'HERE IS MY EPIC TESTING DATAZ');
        return (
            <div>
                <h1>Words With Whales</h1>
                {this.state.color &&
                  <h2>Welcome player {this.state.color}</h2>
                }
                {this.state.turn &&
                  <h2>It is player {this.state.turn + '\'s'} turn!</h2>
                }

                { this.state.gameHasStarted === 0 ? <Lobby click2StartGame={this.click2StartGame} allPlayers={this.state.allPlayers}/> :
                  <div>
                    < Board board={board} boardPlace={this.boardPlace}/>
                  < Bench bench={bench} mulligan={this.click2Mulligan} pickLetter={this.pickLetter} pass={this.pass} turn={this.state.turn} color={this.state.color} usedTiles={this.state.usedTiles} done={this.done}/>
                  </div>
                }
            </div>
        )
    }


}
export default App;

// onClick={this.onClick}
