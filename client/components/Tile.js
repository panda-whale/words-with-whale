import React from "react";

const Tile = props => {
  //console.log("row", props.row);
  //console.log("column", props.column);
  return (
    <button rowid={props.row} columnid={props.column}>
      {props.tile}
    </button>
  );
};

export default Tile;
