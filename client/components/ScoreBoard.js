import React from 'react';

const ScoreBoard = (props) => {
    let scoreBoardP = [];
    const colorsArr = Object.keys(props.score);
    const scoresArr = Object.values(props.score);
    for(let i=0; i<scoresArr.length; i++) {
        scoreBoardP.push(<span className="score">{(i==0 ? '| ' : '') + colorsArr[i]} : {scoresArr[i] + '\t'} | </span>)
    }
    return (
        <div id="scoreBoard">
            <h2>Scoreboard</h2>
            {scoreBoardP}
        </div>
    )
}

export default ScoreBoard;
