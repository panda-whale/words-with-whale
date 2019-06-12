import React from 'react';

const Letter = (props) => {
    // console.log('this is props.points', props.points)

    return (
        <div className="letters">
          <button className="bench" onClick={props.pickLetter} id={[props.bench]}>{props.bench} - {props.points}</button>
          {/* <button className="points">{props.points}</button> */}
        </div>
    )
}

export default Letter;