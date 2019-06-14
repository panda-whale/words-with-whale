import React from 'react';
import Letter from '../components/Letter';
import './Bench.module.scss';

const Bench = (props) => {

    const letter = [];

    for(let i = 0; i < props.bench.length; i++) {
        // check if bench letter is in use and disable it on display
        const isDisabled = props.usedTiles.reduce((acc, ele) => {return ele.benchId == i ? true : acc}, false);

        letter.push(< Letter id={i} letter={props.bench[i].letter} points={props.bench[i].points} pickLetter={props.pickLetter} isDisabled={isDisabled}/>);
    }


    return (
        <div id="benchContainer">
            <div className="letter">
            {letter}
            </div>
            <button className="button" onClick={() => props.mulligan()} disabled={props.color !== props.turn}>mull</button>
            <button className="button" onClick={() => props.done()} disabled={props.color !== props.turn}>done</button>
            <button className="button" onClick={() => props.pass()} disabled={props.color !== props.turn} >pass</button>
        </div>
    )
}

export default Bench;
