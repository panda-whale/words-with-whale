import React from 'react';
//import Row from './Row';
import Tile from './Tile';


const Board = (props) => {
    // const rows = [];
    // for(let i = 0; i < props.board.length; i++) {
    //     rows.push(< Row id={i} row={props.board[i]} />)
    // }
    const boardCell = [];
    for(let i = 0; i < 15; i++){
        boardCell.push(< Tile id={i} board={props.board[i]} />)
    }
    return (
        <div>
            {boardCell}
        </div>
    )
}

export default Board;