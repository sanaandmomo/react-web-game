const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
    const getRandomNumber = () => Math.ceil(Math.random() * 9);

    const [first, setFirst] = useState(getRandomNumber());
    const [second, setSecond] = useState(getRandomNumber());
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const inputRef = useRef();

    const checkAnswer = () => {
        if (Number(value) === first * second) {
            setResult((...args) => `정답: ${value}`);
            setFirst(getRandomNumber());
            setSecond(getRandomNumber());
        }
        else {
            setResult('땡');
        }
        
        setValue('');
        inputRef.current.focus();
    };

    const onChangeInput = e => setValue(e.target.value);

    const onKeyUpInput = e => e.keyCode == 13 && checkAnswer()

    return (
        <>
            <div>{first} 곱하기 {second}는?</div>
            <input ref={inputRef} onChange={onChangeInput} onKeyUp={onKeyUpInput} value={value}/>
            <button onClick={checkAnswer}>입력!</button>
            <div>{result}</div>
        </>
    );
};

module.exports = GuGuDan;