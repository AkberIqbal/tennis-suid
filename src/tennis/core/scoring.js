/**
 * checks & updates the set won by an individual player
 * 
 * @param {existingState}: state of the scorecard 
 * @param {player}: player that scored the most recent point  
 */
const checkSet = (existingState, player) => {
    const opposingPlayer = (player === 'A') ? 'B' : 'A'
    let newStateWithSetUpdated = { ...existingState };

    if (
        (newStateWithSetUpdated[player].game === 7
            && (newStateWithSetUpdated[player].game - newStateWithSetUpdated[opposingPlayer].game >= 1))
        ||
        (newStateWithSetUpdated[player].game === 6
            && (newStateWithSetUpdated[player].game - newStateWithSetUpdated[opposingPlayer].game >= 2))
    ) {
        newStateWithSetUpdated[player].set += 1;
        newStateWithSetUpdated[player].game = 0;
        newStateWithSetUpdated[opposingPlayer].game = 0;
    }

    return newStateWithSetUpdated;
}

/**
 * checks & updates the game won by an individual player
 * calls to see if sets need to be updated
 * 
 * @param {existingState}: state of the scorecard 
 * @param {player}: player that scored the most recent point  
 */
const checkGames = (existingState, player) => {
    const opposingPlayer = (player === 'A') ? 'B' : 'A'
    let newStateWithGamesUpdated = { ...existingState };

    switch (newStateWithGamesUpdated[player].point) {
        case 'DISADV': newStateWithGamesUpdated[player].point = '40'; newStateWithGamesUpdated[opposingPlayer].point = '40'; break;
        case '40': if (newStateWithGamesUpdated[opposingPlayer].point === '40') {
            newStateWithGamesUpdated[player].point = 'ADV';
            newStateWithGamesUpdated[opposingPlayer].point = 'DISADV';
            break;
        } else {
            newStateWithGamesUpdated[player].point = '0';
            newStateWithGamesUpdated[player].game += 1;
            newStateWithGamesUpdated[opposingPlayer].point = '0';
            newStateWithGamesUpdated = checkSet(newStateWithGamesUpdated, player);
            break;
        }
        case 'ADV':
            newStateWithGamesUpdated[player].point = '0';
            newStateWithGamesUpdated[player].game += 1;
            newStateWithGamesUpdated[opposingPlayer].point = '0';
            newStateWithGamesUpdated = checkSet(newStateWithGamesUpdated, player);
            break;
        default: break;
    }

    if (newStateWithGamesUpdated[player].tieBreakPoint === 7 && (newStateWithGamesUpdated[player].tieBreakPoint - newStateWithGamesUpdated[opposingPlayer].tieBreakPoint >= 1)) {
        newStateWithGamesUpdated[player].game += 1;
        newStateWithGamesUpdated[player].tieBreakPoint = 0;
        newStateWithGamesUpdated[opposingPlayer].tieBreakPoint = 0;
        newStateWithGamesUpdated = checkSet(newStateWithGamesUpdated, player);
    }

    return newStateWithGamesUpdated;
}


/**
 * checks & updates the point won by an individual player
 * calls to see if games need to be updated
 * 
 * @param {existingState}: state of the scorecard 
 * @param {player}: player that scored the most recent point  
 */
export const scorePoint = (state, player) => {
    const opposingPlayer = (player === 'A') ? 'B' : 'A'
    let newState = { ...state };


    if (newState[player].game === 6 && newState[opposingPlayer].game === 6) {
        /* tie breaker point scroing works */
        newState[player].tieBreakPoint += 1;
        if (newState[player].tieBreakPoint >= 7 && (newState[player].tieBreakPoint - newState[opposingPlayer].tieBreakPoint >= 2)) {
            checkGames(newState, player);
        }
    } else {
        /* normal point scroing works */
        if (newState[player].point === '0') newState[player].point = '15';
        else if (newState[player].point === '15') newState[player].point = '30';
        else if (newState[player].point === '30') newState[player].point = '40';
        else if (newState[player].point === '40' || newState[player].point === 'ADV' || newState[player].point === 'DISADV') newState = checkGames(newState, player);
    }

    return newState;
}
