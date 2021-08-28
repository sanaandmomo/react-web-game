import React, { Component, createRef } from 'react';
import TryClass from './TryClass';

const getNumbers = () => {
    const set = new Set();

    while (set.size < 4) {
        set.add(Math.ceil(Math.random() * 9));
    }

    return [...set];
};

class NumberBaseBallClass extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: []
    };

    inputRef = createRef();

    restartGame() {
        alert('게임을 다시 시작합니다!');

        this.setState({
            value: '',
            answer: getNumbers(),
            tries: []
        });
    }

    checkAnswer() {
        if (!this.state.value) return;

        if (this.state.value == this.state.answer.join('')) {
            this.setState({
                result: '홈런!'
            });

            this.restartGame();
        }
        else if (this.state.tries.length >= 9) {
            this.setState({
                result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}이였습니다!`
            });

            this.restartGame();
        }
        else {
            const { strike, ball } = [...this.state.value].map(Number).reduce((m, num, i) => {
                if (num == this.state.answer[i]) {
                    m.strike++;
                }
                else if (this.state.answer.includes(num)) {
                    m.ball++;
                }

                return m;
            }, { strike: 0, ball: 0 });

            this.setState(prevState => ({
                tries: [...prevState.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다` }],
                value: ''
            }));
        }
    }

    onSubmitForm = e => {
        e.preventDefault();
        this.checkAnswer();
    }

    onKeyUpInput = e => e.keyCode == 13 && this.checkAnswer();

    onChangeInput = e => this.setState({ value: e.target.value });

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} onKeyUp={this.onKeyUpInput} />
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => <TryClass key={`${i + 1}차 시도: `} tryInfo={v} />)}
                </ul>
            </>
        );
    }
}

export default NumberBaseBallClass;