import { scorePoint } from './scoring';

describe('Points & game related scenarios', () => {

    /* score point changes the points scored from 0 40 and then games as 1 */
    it('check if scoring in a game works (happy path)', () => {
        const initialScore = {
            A: { set: 0, game: 0, point: '0', tieBreakPoint: 0 },
            B: { set: 0, game: 0, point: '0', tieBreakPoint: 0 }
        }
        let returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.point).toBe('15');
        returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.point).toBe('30');
        returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.point).toBe('40');
        returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.point).toBe('0');
        expect(returnScoreState.A.game).toBe(1);

    });

    /* if both players are on '40' we go to advantage instead of game increment by 1 */
    it('case of deuce ', () => {
        const initialScore = {
            A: { set: 0, game: 0, point: '30', tieBreakPoint: 0 },
            B: { set: 0, game: 0, point: '40', tieBreakPoint: 0 }
        };
        let returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.point).toBe('40');
        returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.point).toBe('ADV');
        expect(returnScoreState.B.point).toBe('DISADV');
        expect(returnScoreState.A.game).toBe(0);
    });

    /* if the opposite player has an advantage, it takes 2 points to win the game */
    it('winning game when opposite player has Advantage ', () => {
        const initialScore = {
            A: { set: 0, game: 0, point: 'DISADV', tieBreakPoint: 0 },
            B: { set: 0, game: 0, point: 'ADV', tieBreakPoint: 0 }
        };
        let returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.point).toBe('40');
        expect(returnScoreState.B.point).toBe('40');
        returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.point).toBe('ADV');
        expect(returnScoreState.B.point).toBe('DISADV');
        returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.game).toBe(1);
        expect(returnScoreState.A.point).toBe('0');
        expect(returnScoreState.B.point).toBe('0');
    });
});


describe('Game and set related scenarios', () => {
    /* score point changes the points scored from 0 40 and then games as 1 */
    it('winning a set (happy path)', () => {
        const initialScore = {
            A: { set: 0, game: 5, point: '40', tieBreakPoint: 0 },
            B: { set: 0, game: 2, point: '15', tieBreakPoint: 0 }
        };
        let returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.game).toBe(0);
        expect(returnScoreState.A.set).toBe(1);
    });

    /* winning 6 games only works if the opposite player has less than 5 games */
    it('to win a set, need a difference of 2, else games increase beyond 6', () => {
        const initialScore = {
            A: { set: 0, game: 5, point: '40', tieBreakPoint: 0 },
            B: { set: 0, game: 5, point: '15', tieBreakPoint: 0 }
        };
        let returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.game).toBe(6);
        expect(returnScoreState.B.game).toBe(5);
        expect(returnScoreState.A.set).toBe(0);
    });

});


describe('Tiebreaker scenarios', () => {
    /* score point changes the points scored from 0 40 and then games as 1 */
    it('from 6-5, winning a set 7-5 is possible', () => {
        const initialScore = {
            A: { set: 0, game: 6, point: '40', tieBreakPoint: 0 },
            B: { set: 0, game: 5, point: '15', tieBreakPoint: 0 }
        };
        let returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.game).toBe(0);
        expect(returnScoreState.B.game).toBe(0);
        expect(returnScoreState.A.set).toBe(1);
    });

    /* on 6-6, we go to a tie breaker */
    it('when at 6-6 we go to a tie breaker', () => {
        const initialScore = {
            A: { set: 0, game: 6, point: '0', tieBreakPoint: 0 },
            B: { set: 0, game: 6, point: '0', tieBreakPoint: 0 }
        };
        let returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.tieBreakPoint).toBe(1);
        expect(returnScoreState.B.tieBreakPoint).toBe(0);
        returnScoreState = scorePoint(initialScore, 'A');
        returnScoreState = scorePoint(initialScore, 'A');
        returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.tieBreakPoint).toBe(4);
        expect(returnScoreState.B.tieBreakPoint).toBe(0);
        returnScoreState = scorePoint(initialScore, 'A');
        returnScoreState = scorePoint(initialScore, 'A');
        returnScoreState = scorePoint(initialScore, 'A');
        expect(returnScoreState.A.set).toBe(1);
    });

});
