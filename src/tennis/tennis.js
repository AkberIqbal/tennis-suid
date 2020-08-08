import React, { useState } from 'react';
import Scorecard from './interfaces/scorecard'
import ScoringButtons from './interfaces/scoringButtons';
import { scorePoint } from './core/scoring';

const Tennis = () => {

    const initialScore = {
        A: { set: 0, game: 0, point: '0', tieBreakPoint: 0 },
        B: { set: 0, game: 0, point: '0', tieBreakPoint: 0 }
    };

    const [scores, setScores] = useState(initialScore);

    const pointScored = (playerName) => {
        const returnScoreState = scorePoint(scores, playerName);
        setScores(returnScoreState);
    }

    return <>
        <Scorecard scores={scores} />
        <ScoringButtons pointWonBy={pointScored} />
    </>
}

export default Tennis;