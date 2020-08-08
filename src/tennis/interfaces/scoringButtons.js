import React from 'react';
import PropTypes from 'prop-types';
import './scorecard.css';

const ScoringButtons = ({ pointWonBy }) => {

    return <div className='container'>
        <div className='row buttonsContainer'>
            <div className='col-6'>
                <button data-testid="scoreForA" type='button' className='scoringButtons' onClick={() => pointWonBy('A')} >Click to mark a score for Player A</button>
            </div>
            <div className='col-6'>
                <button data-testid="scoreForB" type='button' className='scoringButtons' onClick={() => pointWonBy('B')} >Click to mark a score for Player B</button>
            </div>
        </div>
    </div>
}

ScoringButtons.propTypes = {
    pointWonBy: PropTypes.func,
};

ScoringButtons.defaultProps = {
    pointWonBy: () => { },
};

export default ScoringButtons;