import React, { Component } from 'react';
import Ball from './Ball';
import getWinNumbers from './getWinNumber';

class Lotto extends Component {
    state = this.getInitState();

    timeoutMs = 1000;
    timeout;

    getInitState() {
        return {
            winNumbers: getWinNumbers(), // 당첨 숫자들
            winBalls: [],
            bonus: null,
            redo: false
        };
    }

    runTimeouts = () => {
        const { winNumbers } = this.state;
        const _this = this;

        (function f(depth) {
            if (depth == winNumbers.length - 1) {
                _this.timeout = setTimeout(() => {
                    _this.setState({
                        bonus: winNumbers[6], 
                        redo: true
                    });
                }, _this.timeoutMs);

                return;
            }

            _this.timeout = setTimeout(() => {
                _this.setState(prevState => ({
                    winBalls: [...prevState.winBalls, winNumbers[depth]]
                }));

                f(depth + 1);
            }, _this.timeoutMs);
        })(0);
    }

    componentDidMount() {
        // console.log('componentDidMount');

        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate');

        prevState.redo && this.runTimeouts();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    onClickRedo = () => {
        // console.log('onCLickRedo');
        this.setState(this.getInitState());
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        console.log('render');
        return (
            <>
                <div>당첨 숫자</div>
                <div id="resultArea">
                    {winBalls.map(ball => <Ball key={ball} number={ball} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        );
    }
}

export default Lotto;