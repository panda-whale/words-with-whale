import React, { Component } from "react";
import { render } from "react-dom";
import Board from "../components/Board";
import Bench from "./Bench";
import Lobby from './Lobby';
import openSocket from "socket.io-client";


// const ipAddress = "http://192.168.0.97:3000";
const ipAddress = "http://192.168.0.221:3000";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: [['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-',  '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','*','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-']],
      socket: openSocket(ipAddress),
      color: null,
      turn: null,
      allPlayers: [],
      gameHasStarted: 0,
      bench: [],
      points: [],
      letter: ''
      }
        this.state.socket.on('color', (color) => this.setState({...this.state, color}));
        this.state.socket.on('playerConnect', (players) => this.setState({...this.state, allPlayers: players}));
        this.state.socket.on('mulliganTiles', (tiles) => this.setState({...this.state, bench: tiles}));
        this.state.socket.on('initGame', ({tiles, turn}) => this.setState({
          ...this.state, turn, bench: tiles, gameHasStarted : 1, points: tiles}));
        this.onClick = this.onClick.bind(this);
        this.click2StartGame = this.click2StartGame.bind(this);
        this.click2Mulligan = this.click2Mulligan.bind(this);
        this.pickLetter = this.pickLetter.bind(this);
    }
    onClick (e){
      // console.log(e.target.id);
      console.log(this.state.board[e.target.id]);
    }
    click2StartGame () {
      // console.log('emitting game start');
      this.state.socket.emit('gameStart');
    }
    click2Mulligan () {
      // we need to send back all of state.bench to server
      // console.log('this is hittting')
      this.state.socket.emit('getTiles', {b: this.state.bench, c:this.state.color});
    }
    pickLetter (e) {
      // console.log('this is the exact letter', e.target.id)
      this.setState({...this.state, letter: e.target.id});
    }
    render() {
        const { board, allPlayers, bench, points} = this.state;
        console.log(allPlayers);
        if(this.state.socket)  this.state.socket.emit('test', 'HERE IS MY EPIC TESTING DATAZ');
        return (
            <div>
                <h1>Words With Whales</h1>
                {this.state.color &&
                  <h2>Welcome player {this.state.color}</h2>
                }

                { this.state.gameHasStarted === 0 ? <Lobby click2StartGame={this.click2StartGame} allPlayers={this.state.allPlayers}/> :
                  <div>
                    < Board board={board}  onClick={this.onClick}/>
                    < Bench bench={bench} points={points} mulligan={this.click2Mulligan} pickLetter={this.pickLetter} />
                  </div>
                }
            </div>
        )
    }

}
export default App;

// onClick={this.onClick}
