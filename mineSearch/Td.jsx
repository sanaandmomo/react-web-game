import React, { memo, useContext, useCallback, useMemo } from 'react';
import TableContext from './tableContext';
import TYPE, { CODE, GAME_STATE } from './Type';

const STYLE = {
    [CODE.NORMAL]: { background: '#444' },
    [CODE.MINE]: { background: '#444' },
    [CODE.OPENED]: { background: 'white'},
    [CODE.CLICKED_MINE]: { background: 'white'},
    [CODE.FLAG]: { background: 'red'},
    [CODE.FLAG_MINE]: { background: 'red'},
    [CODE.QUESTION]: { background: 'yellow'},
    [CODE.QUESTION_MINE]: { background: 'yellow'},
};

const TEXT = {
    [CODE.NORMAL]: '',
    [CODE.MINE]: 'X',
    [CODE.OPENED]: '',
    [CODE.CLICKED_MINE]: '펑',
    [CODE.FLAG]: '!',
    [CODE.FLAG_MINE]: '!',
    [CODE.QUESTION]: '?',
    [CODE.QUESTION_MINE]: '?',
};

const Td = memo(({ rowIndex, colIndex, cellData }) => {
    const { state, dispatch } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (state != GAME_STATE.RUN) return;

        if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(cellData)) return;

        switch (cellData) {
            case CODE.NORMAL:
                dispatch({ type: TYPE.OPEN_CELL, row: rowIndex, col: colIndex });
                dispatch({ type: TYPE.CALC_GAME, row: rowIndex, col: colIndex });
            break;
            case CODE.MINE:
                dispatch({ type: TYPE.CLICK_MINE, row: rowIndex, col: colIndex });
            break;
        }
    }, [cellData, state]);

    const onRightClickTd = useCallback(e => {
        e.preventDefault();

        if (state != GAME_STATE.RUN) return;

        switch (cellData) {
            case CODE.NORMAL:
                dispatch({ type: TYPE.FLAG_CELL, row: rowIndex, col: colIndex });
                break;
            case CODE.MINE:
                dispatch({ type: TYPE.FLAG_MINE_CELL, row: rowIndex, col: colIndex });
                break;
            case CODE.FLAG:
                dispatch({ type: TYPE.QUESTION_CELL, row: rowIndex, col: colIndex });
                break;
            case CODE.FLAG_MINE:
                dispatch({ type: TYPE.QUESTION_MINE_CELL, row: rowIndex, col: colIndex });
                break;
            case CODE.QUESTION:
                dispatch({ type: TYPE.NORMALIZE_CELL, row: rowIndex, col: colIndex });
                break;
            case CODE.QUESTION_MINE:
                dispatch({ type: TYPE.NORMALIZE_MINE_CELL, row: rowIndex, col: colIndex });
                break;
        }
    }, [cellData, state]);

    console.log('td render');

    return useMemo(() => (
        <td style={STYLE[cellData]} onClick={onClickTd} onContextMenu={onRightClickTd}>
            {cellData > 0 ? cellData : TEXT[cellData]}
        </td>
    ), [cellData]);
});

export default Td;