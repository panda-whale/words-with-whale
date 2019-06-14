import React, { Component } from "react";
import { render } from "react-dom";
import Board from "../components/Board";
import Bench from "./Bench";
import Lobby from './Lobby';
import openSocket from "socket.io-client";
import ScoreBoard from '../components/ScoreBoard';
import './../styles.scss';



const ipAddress = "http://192.168.0.97:3000"; // Roy's
 //const ipAddress = "http://192.168.0.221:3000"; //Jay's
// const ipAddress = "http://192.168.0.161:3000"; //sam


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
      usedTiles: [],
      hasFirstWord: false,
      }

      for (let i = 0; i < 15; i++) {
        let rowArr = [];
        for (let j = 0; j < 15; j++) {
          if (i === 7 && j == 7) {
            rowArr.push({letter:'*', points: 0 });
          } else {
            rowArr.push({letter: '-', points: 0 });
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
      this.state.socket.on('updateBoard', (board) => this.setState({...this.state, board, hasFirstWord:true}));

      // functions
      this.boardPlace = this.boardPlace.bind(this);
      this.click2StartGame = this.click2StartGame.bind(this);
      this.click2Mulligan = this.click2Mulligan.bind(this);
      this.pickLetter = this.pickLetter.bind(this);
      this.pass = this.pass.bind(this);
      this.done = this.done.bind(this);
      this.receiveNewTiles = this.receiveNewTiles.bind(this);
      this.state.socket.on('newTiles', this.receiveNewTiles);

    }
    receiveNewTiles(newTiles) {

      let newBench = []
      // loop through used tiles, and remove from bench.
      for(let i = 0; i < this.state.bench.length; i++) {
        let found = false;
        for(let j = 0; j < this.state.usedTiles.length; j++) {
          //console.log('benchId: ', this.state.usedTiles[j].benchId);
          //console.log()
          if(this.state.usedTiles[j].benchId == i) {
            found = true;
          }
        }
        if(!found) newBench.push(this.state.bench[i]);
      }
      // add new tiles to slice of bench and reset used tiles
      newBench = newBench.concat(newTiles);

      return this.setState({...this.state, bench:newBench, usedTiles:[]});
      // setState
    }

    boardPlace (e) {
      let num = e.target.id.split(',');

      // can place letter on board
      let cord = this.state.board.slice();
      const newUsedTiles = this.state.usedTiles.slice();

      console.log(['-','*'].includes(this.state.board[num[0]][num[1]].letter))
      if(this.state.letter.value !== '' && ['-','*'].includes(this.state.board[num[0]][num[1]].letter)){
        // clicking board to place letter

          cord[num[0]][num[1]].letter = this.state.letter.value;
          cord[num[0]][num[1]].points = this.state.bench[this.state.letter.index].points; //spaghetti

          newUsedTiles.push({value: this.state.letter.value, benchId: this.state.letter.index, boardRowId: num[0], boardColId: num[1]});

          this.setState({...this.state, board:cord, letter:{value : '', index : null}, usedTiles: newUsedTiles});
        } else if (!['-','*'].includes(cord[num[0]][num[1]].letter)){ //clicking board to get letter back to bench
          //check that letter is in my usedTiles
          let found = false;
          let index = -1;
          console.log('searching usedtiles for this character')
          for(let i = 0; i < newUsedTiles.length; i++) {
            if(newUsedTiles[i].boardRowId == num[0] && newUsedTiles[i].boardColId == num[1]){
              found = true;
              index = i;
              break;
            }
          }
          console.log('was it found? ', found);
          if(!found) return;

          cord[num[0]][num[1]].letter = num[0] == 7 && num[1] == 7 ? '*' : '-';
          cord[num[0]][num[1]].points = 0;
          newUsedTiles.splice(index, 1);

          this.setState({...this.state, board:cord, letter:{value : '', index : null}, usedTiles: newUsedTiles});
        }

      }


    click2StartGame () {
      this.state.socket.emit('gameStart');
    }

    click2Mulligan () {
      this.state.socket.emit('getTiles', {b: this.state.bench, c:this.state.color});
    }

    pickLetter (e) {
      if(this.state.letter.value !== '') {
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
        // console.log('setting the letter');
        // console.log(e.target.id);
        // console.log(e.target.id.replace('bench_', ''));
        this.setState({...this.state, letter: { value: e.target.innerHTML, index: e.target.id.replace('bench_', '')}});
      }
    }

    pass () {
      this.state.socket.emit('pass');
    }

    done() {
      // if center is still a star, you must place on the star!
      if(this.state.board[7][7].letter === '*') return this.mismatchReset();
      // did not place anything
      if(this.state.usedTiles.length === 0) return;

      const tiles = this.state.usedTiles;

      // check tiles were all placed on same row or column
      let direction;
      // arrange tiles in order
      // check direction
      console.log('before direction check: ', tiles);
      if(tiles.length > 1) {
        let j = tiles[0].boardColId;
        for(let i = 1; i < tiles.length; i++) {
          if(tiles[i].boardColId != j) {//not vertical
            direction = 'horizontal';
            break;
          } else {
            direction = 'vertical'
          }
        }
        // confirm vertical for no randomly placed piece
        if(direction == 'vertical') {
          for(let i = 1; i < tiles.length; i++) {
            if(tiles[0].boardColId !== tiles[i].boardColId){
              console.log('your word does not connect');
              return this.mismatchReset();
            }
          }
        }
      }

      let words2check = [];
      const board = this.state.board;

      // for each used tile, generate horizontal and vertical word from that tile.
      for(let i = 0; i < tiles.length; i++){
        let verticalWord = tiles[i].value;
        let horizontalWord = tiles[i].value;

        let upIndex = tiles[i].boardRowId;
        let downIndex = tiles[i].boardRowId;
        let leftIndex = tiles[i].boardColId;
        let rightIndex = tiles[i].boardColId;
        while(--upIndex >= 0 && board[upIndex][tiles[i].boardColId].letter !== '-' ) { //up
          verticalWord = board[upIndex][tiles[i].boardColId].letter + verticalWord;
        }
        while(++downIndex < 15 && board[downIndex][tiles[i].boardColId].letter !== '-' ) { //down
          verticalWord = verticalWord + board[downIndex][tiles[i].boardColId].letter
        }
        // don't push single letter vertical words in the horizontal
        if(!(direction === 'horizontal' && verticalWord.length === 1)) { // de morgan's law
          // don't repeat words and don't insert single letter additions
          if(!words2check.includes(verticalWord) && verticalWord.length != 1)  words2check.push(verticalWord);
        }

        while(--leftIndex >= 0 && board[tiles[i].boardRowId][leftIndex].letter !== '-') { //left
          horizontalWord = board[tiles[i].boardRowId][leftIndex].letter + horizontalWord;
        }
        while(++rightIndex < 15 && board[tiles[i].boardRowId][rightIndex].letter !== '-') { //right
          horizontalWord = horizontalWord + board[tiles[i].boardRowId][rightIndex].letter;
        }
        // don't push single letter horizontal words when vertical
        if(!(direction === 'vertical' && horizontalWord.length === 1)) {
          if(!words2check.includes(horizontalWord) && horizontalWord.length != 1) words2check.push(horizontalWord);
        }
      }

      console.log('the words 2 check are: ', words2check);

      // check that each word is longer than the number of tiles placed
      // preventing user from placing words in different places
      if(this.state.hasFirstWord)
      for(let i = 0; i < words2check.length; i++) {
        if(words2check[i].length < tiles.length + 1) return this.mismatchReset();
      }
      /*
      //if horizontal, sort by boardColId, else sort by boardRowId
      if(direction == 'horizontal') {
        tiles.sort((a, b) => ((+a.boardColId) - (+b.boardColId)));
      } else {
        tiles.sort((a, b) => ((+a.boardRowId) - (+b.boardRowId)));
      }

      // don't forget to consider if continue a word or appending to an existing word
      const word = tiles.reduce((acc, ele) => (acc + ele.value), '');
      console.log(tiles);
      */
      // check word on backend
      fetch(ipAddress + "/isWord", {
        method: 'POST',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify({
          words: words2check,
          color: this.state.color,
          usedTiles: tiles,
          board: this.state.board,
        })
      })
      .then(response => response.json())
      .then(response => {
        // if mismatch, reset board state to no used tiles
        if(response['err'] == 'Mismatch') return this.mismatchReset();

        console.log(response);
      })
      .catch(error => console.log(error));
    }

    mismatchReset() {

      const newBoard = this.state.board.slice(); // may want to do a deep copy.
      const tiles = this.state.usedTiles.slice();

      for(let i = 0; i < tiles.length; i++) {
        newBoard[tiles[i].boardRowId][tiles[i].boardColId].letter = '-';
        newBoard[tiles[i].boardRowId][tiles[i].boardColId].points = 0;
      }

      // reset board and usedTiles
      this.setState({...this.state, board: newBoard, usedTiles: []})

    }

    render() {
        const { board, allPlayers, bench } = this.state;

        if(this.state.socket)  this.state.socket.emit('test', 'HERE IS MY EPIC TESTING DATAZ');
        return (
            <div className="mainContainer">
                {this.state.color &&
                  <h2>Welcome player {this.state.color}!</h2>
                }
                {this.state.turn &&
                  <h2>It is player {this.state.turn + '\'s'} turn!</h2>
                }
                 {/* < ScoreBoard score={score} /> */}
                { this.state.gameHasStarted === 0 ? <Lobby click2StartGame={this.click2StartGame} allPlayers={this.state.allPlayers}/> :
                  <div>
                    <h1 id="game">Words With Whales</h1>
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
