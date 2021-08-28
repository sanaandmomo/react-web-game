import React, { useState, createRef, memo } from 'react';
import TryFn from './TryFn';

const getNumbers = () => {
    const set = new Set();

    while (set.size < 4) {
        set.add(Math.ceil(Math.random() * 9));
    }

    return [...set];
};

const NumberBaseBallFn  = memo(() => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const inputRef = createRef();

    const restartGame = () => {
        alert('게임을 다시 시작합니다!');

        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputRef.current.focus();
    };

    const checkAnswer = () => {
        if (!value) return;

        if (value == answer.join('')) {
            setResult('홈런!');

            restartGame();
        }
        else if (tries.length >= 9) {
            setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}이였습니다!`);

            restartGame();
        }
        else {
            const { strike, ball } = [...value].map(Number).reduce((m, num, i) => {
                if (num == answer[i]) {
                    m.strike++;
                }
                else if (answer.includes(num)) {
                    m.ball++;
                }

                return m;
            }, { strike: 0, ball: 0 });

            setTries(prevTries => [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다` }]);
            setValue('');
            inputRef.current.focus();
        }
    }

    const onSubmitForm = e => {
        e.preventDefault();
        checkAnswer();
    }

    const onKeyUpInput = e => e.keyCode == 13 && checkAnswer();

    const onChangeInput = e => setValue(e.target.value);

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} onKeyUp={onKeyUpInput} />
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => <TryFn key={`${i + 1}차 시도: `} tryInfo={v} />)}
            </ul>
        </>
    );
});

export default NumberBaseBallFn;