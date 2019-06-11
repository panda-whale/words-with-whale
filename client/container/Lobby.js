import React, { useState, useEffect } from 'react';


const Lobby = (props) => {

  let playersArr = props.allPlayers;
  console.log("this is inside lobby");
  console.log(playersArr);

  return (
      <div>
          <div>
            {playersArr}
          </div>
      </div>
  )
}

export default Lobby;