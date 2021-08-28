import React, { Component } from 'react';

class RSP extends Component {
    state = {
        result: '',
        RSPstate: 0,
        score: 0
    };

    rspCoords = [0, '-142px', '-284px'];
    scores = [0, 1, -1];

    interval;

    changeHand() {
        this.interval = setInterval(() => {
            this.setState(prevState => ({
                RSPstate: (prevState.RSPstate + 1) % 3
            }));
        }, 100);
    }

    // 첫 랜더링 후 (비동기 요청을 주로 함)
    componentDidMount() {
        this.changeHand();
    }

    // 컴포넌트가 제거되기 직전 (비동기 요청 정리)
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onClickBtn = choice => () => {
        clearInterval(this.interval);
        const { RSPstate } = this.state;
        const myScore = this.scores[choice];
        const computerScore = this.scores[RSPstate];
        const diff = myScore - computerScore;

        if (!diff) {
            this.setState({
                result: '비겼습니다!'
            });
        }
        else if ([-1, 2].includes(diff)) {
            this.setState(prevState => ({
                result: '이겼습니다!',
                score: prevState.score + 1
            }));
        }
        else {
            this.setState(prevState => ({
                result: '졌습니다!',
                score: prevState.score - 1
            }));
        }

        setTimeout(() => this.changeHand(), 1000);
    }

    onClickLock = this.onClickBtn(0)

    onClickScissor = this.onClickBtn(1)

    onClickPaper = this.onClickBtn(2)

    render() {
        const { result, score, RSPstate } = this.state;

        return (
            <>
                <div id="computer" style={{ background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.rspCoords[RSPstate]} 0` }}/>
                <div>
                    <button id="rock" className="btn" onClick={this.onClickLock}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickScissor}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickPaper}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;