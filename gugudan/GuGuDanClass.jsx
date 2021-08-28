const React = require('react');
const { Component } = React;

class GuGuDan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: Math.ceil(Math.random() * 9),
            second: Math.ceil(Math.random() * 9),
            value: '',
            result: ''
        };
    }

    checkAnswer() {
        if (Number(this.state.value) === this.state.first * this.state.second) {
            this.setState(prevState => ({
                first: Math.ceil(Math.random() * 9),
                second: Math.ceil(Math.random() * 9),
                value: '',
                result: `${prevState.first} x ${prevState.second} = ${prevState.value} 정답!`
            }));
        }
        else {
            this.setState({
                value: '',
                result: '땡'
            });
        }
        
        this.input.focus();
    }

    onSubmit = e => {
        e.preventDefault();
        this.checkAnswer();
    }

    onKeyUp = e => {
        e.keyCode == 13 && this.checkAnswer();
    }

    onChange = e => {
        this.setState({ value: e.target.value });
    }

    input;

    onRefInput = dom => this.input = dom;

    render() {
        return (
            <React.Fragment>
                <div>{this.state.first} 곱하기 {this.state.second}는?</div>
                <form onSubmit={this.onSubmit}>
                    <input ref={this.onRefInput} type="number" value={this.state.value} onChange={this.onChange} />
                    <button onKeyUp={this.onKeyUp}>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </React.Fragment>
        );
    }
}

module.exports = GuGuDan;