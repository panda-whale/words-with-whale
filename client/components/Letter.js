import React from 'react';
import { bounce } from 'react-animations';
import styled, { keyframes } from 'styled-components';

// const Bounce = styled.div`animations: 2s ${keyframes `${bounce}`} infinite`; 

const Letter = (props) => {
    // console.log('this is props.points', props.points)
    return (
        <div className="letters">
            <button className="bench" onClick={props.pickLetter} id={'bench_' + props.id} disabled={props.isDisabled}>{props.letter}</button> 
            <p className="points">{props.points}</p>
        </div>
    )
}

export default Letter;
