import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Ball from './Ball';
import getWinNumbers from './getWinNumber';

const Lotto = () => {
    const lottoNumbers = useMemo(getWinNumbers, []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);

    const timeoutMs = 1000;
    const timeout = useRef();

    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
    }, []);

    useEffect(() => {
        console.log('effect');

        (function f(depth) {
            if (depth == winNumbers.length - 1) {
                timeout.current = setTimeout(() => {
                    console.log('setRedo');
                    setBonus(winNumbers[6]);
                    setRedo(true);
                }, timeoutMs);
    
                return;
            }
    
            timeout.current = setTimeout(() => {
                console.log('setWinBalls');
                setWinBalls(prevWinBalls => [...prevWinBalls, winNumbers[depth]]);
                f(depth + 1);
            }, timeoutMs);
        })(0);

        return () => {
            console.log('cleanup');
            clearTimeout(timeout.current);
        };
    }, [winNumbers]);

    console.log('render');
    return (
        <>
            <div>당첨 숫자</div>
            <div id="resultArea">
                {winBalls.map(ball => <Ball key={ball} number={ball} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
};

export default Lotto;
