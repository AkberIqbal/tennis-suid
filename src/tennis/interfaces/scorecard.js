import React from 'react';
import PropTypes from 'prop-types';
import './scorecard.css';

/**
 * renders the sore card on the screen
 * @param {scores}: actual scorecard we need to render 
 */
const Scorecard = ({ scores }) => {

    const showTieBreakColumn = (scores.A.tieBreakPoint !== 0 || scores.B.tieBreakPoint !== 0) ? true : false;


    return <div className='container'>
        <div className='row scoresHeading'>
            <div className='col-3'>Player </div>
            <div className='col-3'>Set</div>
            <div className='col-3'>Games </div>
            {(showTieBreakColumn === true)
                ? (<div className='col-3'>Tiebreak </div>)
                : (<div className='col-3'>Point </div>)
            }
        </div>

        {scores && scores.A ? (
            <div className='row playerRow'>
                <div className='col-3'>A</div>
                <div className='col-3' data-testid='setA'> {scores.A.set} </div>
                <div className='col-3' data-testid='gameA'> {scores.A.game}  </div>
                {(showTieBreakColumn === true)
                    ? (<div className='col-3' data-testid='tbPointA'> {scores.A.tieBreakPoint} </div>)
                    : (<div className='col-3' data-testid='pointA'> {(scores.A.point && scores.A.point === 'DISADV') ? '' : scores.A.point} </div>)
                }
            </div>
        ) : null}
        {scores && scores.B ? (
            <div className='row playerRow'>
                <div className='col-3'>B</div>
                <div className='col-3' data-testid='setB'> {scores.B.set} </div>
                <div className='col-3' data-testid='gameB'> {scores.B.game}  </div>
                {(showTieBreakColumn === true)
                    ? (<div className='col-3' data-testid='tbPointB'> {scores.B.tieBreakPoint} </div>)
                    : (<div className='col-3' data-testid='pointB'> {(scores.B.point && scores.B.point === 'DISADV') ? '' : scores.B.point} </div>)
                }
            </div>
        ) : null}

    </div >
}

Scorecard.propTypes = {
    pointScored: PropTypes.object,
};

Scorecard.defaultProps = {
    pointScored: {},
};

export default Scorecard;