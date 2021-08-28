import React, { useState, useRef, useEffect } from 'react';

const rspCoords = [0, '-142px', '-284px'];
const scores = [0, 1, -1];

const RSP = () => {
    const [result, setResult] = useState('');
    const [RSPstate, setRSPstate] = useState(0);
    const [score, setScore] = useState(0);
    const timeoutRef = useRef();

    useEffect(() => {
        console.log('effect start');
        timeoutRef.current = setTimeout(changeHand, 100);

        return () => {
            console.log('effect end');
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const changeHand = () => setRSPstate(prevRSPstate => (prevRSPstate + 1) % 3);

    const onClickBtn = choice => () => {
        clearTimeout(timeoutRef.current);
        const myScore = scores[choice];
        const computerScore = scores[RSPstate];
        const diff = myScore - computerScore;

        if (!diff) {
            setResult('비겼습니다!');
        }
        else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore(prevScore => prevScore + 1);
        }
        else {
            setResult('졌습니다!');
            setScore(prevScore => prevScore - 1);
        }

        timeoutRef.current = setTimeout(changeHand, 1000);
    };

    const onClickLock = onClickBtn(0);

    const onClickScissor = onClickBtn(1);

    const onClickPaper = onClickBtn(2);

    return (
        <>
            <div id="computer" style={{ background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${rspCoords[RSPstate]} 0` }}/>
            <div>
                <button id="rock" className="btn" onClick={onClickLock}>바위</button>
                <button id="scissor" className="btn" onClick={onClickScissor}>가위</button>
                <button id="paper" className="btn" onClick={onClickPaper}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
};

export default RSP;