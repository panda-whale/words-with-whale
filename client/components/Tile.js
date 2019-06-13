import React from "react";

const Tile = props => {

  return (
    <button id={[props.rowId, props.columnId]} onClick={props.boardPlace} className={props.tile === '-' || props.tile === '*'? 'tileslb' : 'tilesy'} >
      {props.tile}
    </button>
  );
};

export default Tile;
