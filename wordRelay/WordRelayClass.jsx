const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    state = {
        word: '아놀드',
        value: '',
        result: ''
    };

    input;

    checkAnswer() {
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState(prevState => ({
                result: '딩동댕',
                word: prevState.value,
                value: '',
            }));
        }
        else {
            this.setState({
                result: '땡',
                value: ''
            });
        }

        this.input.focus();
    };

    onChangeInput = e => this.setState({ value: e.target.value });

    onKeyUpInput = e => e.keyCode == 13 && this.checkAnswer();

    onRefInput = c => this.input = c;

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} onKeyUp={this.onKeyUpInput} />
                <button onClick={this.checkAnswer}>입력!</button>
                <div>{this.state.result}</div>
            </>
        )
    }
}

module.exports = WordRelay;