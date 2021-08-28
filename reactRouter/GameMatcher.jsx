import React, { Component } from 'react';
import NumberBaseBallClass from '../numberBaseBall/NumberBaseBallClass';
import RSPclass from '../RSP/RSPclass';
import LottoClass from '../Lotto/LottoClass';

export default class GameMatcher extends Component {
    matchComponent = {
        'number-baseball': <NumberBaseBallClass/>,
        'rock-scissors-paper': <RSPclass/>,
        'lotto-generator': <LottoClass/>,
    };

    render() {
        console.log(this.props);

        return this.matchComponent[this.props.match.params.name] || <div>일치하는 게임이 없습니다.</div>;
    }
}