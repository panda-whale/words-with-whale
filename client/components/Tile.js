import React from "react";

const Tile = props => {
  console.log(props.isMyTurn);
  return (
    <button id={[props.rowId, props.columnId]} onClick={props.boardPlace} className={props.tile === '-' || props.tile === '*'? 'tileslb' : 'tilesy'} disabled={!props.isMyTurn} >
      {props.tile}
    </button>
  );
};

export default Tile;
