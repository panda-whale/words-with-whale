import React from 'react';

const Tile = (props) => {
    console.log(props.id)
    return (
            <button id={props.id}>{props.board}</button>
    )
}

export default Tile;