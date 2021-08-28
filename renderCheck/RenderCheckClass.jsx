import React, { Component } from 'react';

class ResponseCheckClass extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: []
    };

    timeout;
    startTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;

        if (state == 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.'
            });

            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭'
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        }
        // 성급하게 클릭
        else if (state == 'ready') {
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
            });
        }
        // 반응 속도 체크
        else if (state == 'now') {
            this.setState(prevState => ({
                state: 'waiting',
                message: '클릭해서 시작하세요.',
                result: [...prevState.result, new Date() - this.startTime]
            }));
        }
    }

    onReset = () => {
        this.setState({
            result: []
        });
    }

    renderAverage = () => {
        const { result } = this.state;

        return (
            result.length 
            ? 
            <>
                <div>평균 시간: {result.reduce((m, v) => m += v, 0) / result.length}ms</div> 
                <button onClick={this.onReset}>리셋</button>
            </>
            : null
        );
    }

    render() {
        const { state, message } = this.state;

        return (
            <>
                <div id="screen" className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheckClass