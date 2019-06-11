import React from 'react';
import Row from './Row';

const Board = (props) => {
    const rows = [];
    for(let i = 0; i < props.board.length; i++) {
        rows.push(< Row id={i} row={props.board[i]} />)
    }
    // console.log(rows)
    return (
        <div>
            {rows}
        </div>
    )
}

export default Board;