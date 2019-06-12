import React, { Component } from "react";
import { render } from "react-dom";
import Board from "../components/Board";
import Bench from "./Bench";
import Signup from './Signup';
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
      }
        this.state.socket.on('color', (color) => this.setState({...this.state, color}))
        this.state.socket.on('playerConnect', (players) => this.setState({...this.state, allPlayers: players}));
    }
    render() {
        const { board, letter, allPlayers} = this.state;
        //console.log(allPlayers);
        if(this.state.socket)  this.state.socket.emit('test', 'HERE IS MY EPIC TESTING DATAZ');
        return (
            <div>
                <h1>Words With Whales</h1>
                {this.state.color &&
                  <h2>Welcome player {this.state.color}</h2>
                }
                < Signup />
                < Board board={ board } />
                < Bench letter={letter} />
            </div>
        )
    }

}
export default App;
