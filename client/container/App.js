import React, { Component } from "react";
import { render } from "react-dom";
import Board from "../components/Board";
import Bench from "./Bench";
import Lobby from './Lobby';
import openSocket from "socket.io-client";


const ipAddress = "http://192.168.0.97:3000";
// const ipAddress = "127.0.0.1:3000";

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
      letter: ["a"],
      socket: openSocket(ipAddress),
      color: null,
      turn: null,
      allPlayers: [],
      gameHasStarted: 0,
      bench: [],
      }
        this.state.socket.on('color', (color) => this.setState({...this.state, color}));
        this.state.socket.on('playerConnect', (players) => this.setState({...this.state, allPlayers: players}));
        this.state.socket.on('initGame', ({tiles, turn}) => this.setState({
          ...this.state, turn, bench: tiles, gameHasStarted : 1}));
        this.onClick = this.onClick.bind(this);
        this.click2StartGame = this.click2StartGame.bind(this);
    }
    onClick (e){
      console.log(e.target.id);
    }
    click2StartGame () {
      console.log('emitting game start');
      this.state.socket.emit('gameStart');
    }
    render() {
        const { board, letter, allPlayers} = this.state;
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
                    < Bench letter={letter} />
                  </div>
                }
            </div>
        )
    }

}
export default App;

// onClick={this.onClick}
