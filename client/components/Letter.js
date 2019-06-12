import React from 'react';

const Letter = (props) => {
    // console.log('this is props.points', props.points)

    return (
        <div>
          <p className="bench">{props.bench}</p>
          <p className="points">{props.points}</p>
        </div>
    )
}

export default Letter;