import React from "react";

const Tile = props => {
  
  return (
    <button id={[props.row, props.column]} onClick={props.boardPlace} className={props.tile === '-' || props.tile === '*'? 'tileslb' : 'tilesy'} >
      {props.tile}
    </button>
  );
};

export default Tile;


