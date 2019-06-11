import React, { Component } from "react";
import { render } from "react-dom";
import Board from "../components/Board";
import Bench from "./Bench";
import Lobby from './Lobby';
import openSocket from "socket.io-client";


const ipAddress = "http://192.168.0.97:3000";

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
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','★','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-'],
      ['-', '-', '-', '-','-','-','-','-','-','-','-','-','-','-','-']],
      letter: ["a"],
      socket: openSocket(ipAddress),
      color: null,
      allPlayers: [],
      gameHasStarted: 0
      }
        this.state.socket.on('color', (color) => this.setState({...this.state, color}))
        this.state.socket.on('playerConnect', (players) => this.setState({...this.state, allPlayers: players}));
    }
    render() {
        const { board, letter, allPlayers} = this.state;
        //console.log(allPlayers);
        return (
            <div>
                <h1>Words With Whales</h1>
                {this.state.color &&
                  <h2>Welcome player {this.state.color}</h2>
                }

                { this.state.gameHasStarted === 0 ? <Lobby /> : 
                  <div>
                    < Board board={board} />
                    < Bench letter={letter} />
                  </div>
                }
            </div>
        )
    }

}
export default App;
