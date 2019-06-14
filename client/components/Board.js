import React from "react";
import Row from "./Row";
import './Board.module.scss';

const Board = props => {
  const rows = [];

  for (let i = 0; i < props.board.length; i++) {
    rows.push(<Row id={i} row={props.board[i]} boardPlace={ props.boardPlace } color={ props.color } isMyTurn={props.isMyTurn}/>);
  }
  return <div id="boardContainer">{rows}</div>;
};

export default Board;
