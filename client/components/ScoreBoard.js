import React from 'react';

const ScoreBoard = (props) => {
    const scoresArr = props.score.map((ele) =>
    { return <p> {ele.color} : {ele.score} </p>});
    return (
        <div>
            <h2>Scoreboard</h2>
            {scoresArr}
        </div>
    )
}

export default ScoreBoard;