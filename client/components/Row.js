import React from 'react'
import Tile from './Tile';

const Row = (props) => {
    let tiles = [];
    
    for(let i = 0; i < props.row.length; i++) {
        // const id = `${props.id}, ${i}`
        const rowId = props.id;
        const columnId = i
        tiles.push(< Tile row={rowId} column={columnId} tile={props.row[i]} />)
    }
  
    return (
        <div>
            {tiles}
        </div>
    )
}

export default Row;