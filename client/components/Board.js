import React from "react";
import Row from "./Row";

const Board = props => {
  const rows = [];
  console.log(props.board);
  for (let i = 0; i < props.board.length; i++) {
    rows.push(<Row id={i} row={props.board[i]} boardPlace={ props.boardPlace }/>);
  }
  return <div>{rows}</div>;
};

export default Board;
