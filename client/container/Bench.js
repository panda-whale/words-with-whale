import React from 'react';
import Letter from '../components/Letter';

const Bench = (props) => {
    const letter = [];
    for(let i = 0; i < 7; i++) {
        letter.push(< Letter id={i} bench={props.bench[i].letter} points={props.points[i].points} />);
        // console.log('this is the object', props.points)
    }

    // console.log('this is props.bench', props.points);

    return (
        <div>
            <div>
            {letter}
            </div>
            <button onClick={() => props.mulligan()}>mull</button>
            <button>done</button>
            <button>pass</button>
        </div>
    )
}

export default Bench;

// points={props.points[i].points}