import React from "react";
import Tile from "./Tile";

<<<<<<< HEAD
const Row = props => {
  let tiles = [];

  for (let i = 0; i < props.row.length; i++) {
    // const id = `${props.id}, ${i}`
    const rowId = props.id;
    const columnId = i;
    tiles.push(<Tile row={rowId} column={columnId} tile={props.row[i]} />);
  }

  return <div>{tiles}</div>;
};

export default Row;
=======
const Row = (props) => {
    let tiles = [];
    
    for(let i = 0; i < props.row.length; i++) {
        // const id = `${props.id}, ${i}`
        const rowId = props.id;
        const columnId = i
        tiles.push(< Tile row={rowId} column={columnId} tile={props.row[i]} onClick={props.onClick} />)
    }
  
    return (
        <div>
            {tiles}
        </div>
    )
}

export default Row;
// onClick={props.onClick}
>>>>>>> 79b8217659d444f5bbb576ef05fb2a8fce85acdd
