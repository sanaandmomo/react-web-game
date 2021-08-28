import React, { useState, useRef } from 'react';

const ResponseCheckFn = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('');
    const [result, setResult] = useState([]);
    const timeout = useRef();
    const startTime = useRef();

    const onClickScreen = () => {
        if (state == 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');

            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        }
        // 성급하게 클릭
        else if (state == 'ready') {
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        }
        // 반응 속도 체크
        else if (state == 'now') {
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult(prevResult => [...prevResult, new Date() - startTime.current]);
        }
    };

    const onReset = () => setResult([]);

    const renderAverage = () => (
        result.length 
        ? 
        <>
            <div>평균 시간: {result.reduce((m, v) => m += v, 0) / result.length}ms</div> 
            <button onClick={onReset}>리셋</button>
        </>
        : null
    );

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
        </>
    );
};

export default ResponseCheckFn;