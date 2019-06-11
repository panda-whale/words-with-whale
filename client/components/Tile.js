import React from 'react';

const Tile = (props) => {
    console.log(props.id);
    return (
            <button id={props.id}>{props.tile}</button>
    )
}

export default Tile;