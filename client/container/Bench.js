import React from 'react';
import Letter from '../components/Letter';

const Bench = (props) => {
    const letter = [];
    for(let i = 0; i < 7; i++) {
        letter.push(< Letter id={i} letter={props.letter} />);
    }
    return (
        <div>
            <div>
            {letter}
            </div>
            <button>mull</button>
            <button>done</button>
            <button>pass</button>
        </div>
    )
}

export default Bench;