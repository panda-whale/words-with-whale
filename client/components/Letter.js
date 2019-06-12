import React from 'react';

const Letter = (props) => {
    // console.log('this is props.points', props.points)

    return (
        <div className="letters">
          <button className="bench" onClick={props.pickLetter} id={'bench_' + props.id}>{props.letter}</button>
          <p className="points">{props.points}</p>
        </div>
    )
}

export default Letter;
