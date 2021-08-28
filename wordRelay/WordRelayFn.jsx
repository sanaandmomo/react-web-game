const React = require('react');
const { useState, useRef } = React;

const WordRelayFn = () => {
    const [word, setWord] = useState('아놀드');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const inputRef = useRef();

    const checkAnswer = () => {
        if (word[word.length - 1] === value[0]) {
            setWord(value);
            setResult('딩동댕');

        }
        else {
            setResult('땡');
        }

        setValue('');
        inputRef.current.focus();
    };

    const onChangeInput = e => setValue(e.target.value);

    const onKeyUpInput = e => e.keyCode == 13 && checkAnswer();

    return (
        <>
            <div>{word}</div>
            <input ref={inputRef} value={value} onChange={onChangeInput} onKeyUp={onKeyUpInput} />
            <button onClick={checkAnswer}>입력!</button>
            <div>{result}</div>
        </>
    );
};

module.exports = WordRelayFn;