import React from "react";
import Row from "./Row";

const Board = props => {
  const rows = [];
  for (let i = 0; i < props.board.length; i++) {
    rows.push(<Row id={i} row={props.board[i]} onClick={ props.onClick }/>);
  }
  return <div id="boardContainer">{rows}</div>;
};

export default Board;

