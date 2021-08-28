import React, { useState, useCallback, useContext, memo } from 'react';
import TableContext from './tableContext';
import TYPE from './Type';

const Form = memo(() => {
    const [row, setRow] = useState(10);
    const [col, setCol] = useState(10);
    const [mine, setMine] = useState(20);
    const { dispatch } = useContext(TableContext);

    const onChangeInput = useCallback(setState => e => setState(e.target.value), []);

    const onChangeRow = useCallback(onChangeInput(setRow), []);

    const onChangeCol = useCallback(onChangeInput(setCol), []);

    const onChangeMine = useCallback(onChangeInput(setMine), []);

    const onClickBtn = useCallback(() => {
        dispatch({ type: TYPE.START_GAME, row, col, mine });
    }, [row, col, mine]);

    // console.log('form render');
    return (
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow}/>
            <input type="number" placeholder="가로" value={col} onChange={onChangeCol}/>
            <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine}/>
            <button onClick={onClickBtn}>시작</button>
        </div>
    );
});

export default Form;