import React, { useState, useEffect } from 'react';


const Lobby = (props) => {

  const players = props.allPlayers.map((ele) =>
                                    { return <p>{ele}</p>});

  return (
      <div>
          <div>
            {players}
          </div>
          <button onClick={() => {console.log('CLICK');props.click2StartGame();}}>START GAME</button>
      </div>

  )
}

export default Lobby;
