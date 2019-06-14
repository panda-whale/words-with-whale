import React, { useState, useEffect } from 'react';
import './Lobby.module.scss';


const Lobby = ({allPlayers, click2StartGame}) => {
  const players = allPlayers.map((ele) => <p className="players">Player: {ele}</p>);

  return (
      <div id="lobby">
           <h1 id="lobbyTitle">Words With Whales</h1>
          <div>
            {players}
          </div>
          <button id="start" onClick={click2StartGame}>START GAME</button>
      </div>
  )
}

export default Lobby;
