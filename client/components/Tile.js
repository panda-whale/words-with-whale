import React from "react";

const Tile = props => {

  //console.log("row", props.row);
  //console.log("column", props.column);
  
  return (
    <button id={[props.row, props.column]} onClick={props.onClick} >
      {props.tile}
    </button>
  );
};

export default Tile;


