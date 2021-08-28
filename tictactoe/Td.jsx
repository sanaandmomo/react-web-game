import React, { useCallback, memo } from 'react';
import TYPE from './Type';

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
    const onClickTd = useCallback(() => {
        if (cellData) return;

        dispatch({ type: TYPE.CLICK_CELL, row: rowIndex, cell: cellIndex });
        dispatch({ type: TYPE.CALC_GAME });
        dispatch({ type: TYPE.CHANGE_TURN });
    }, [cellData]);

    console.log('td render');
    
    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;