import React from 'react';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
    return (
        <BrowserRouter>
            <div>
                <p>
                    <Link to="/game/number-baseball?query=10&hello=arnold&bye=react">숫자야구</Link>
                </p>
                <p>
                    <Link to="/game/rock-scissors-paper">가위바위보</Link>
                </p>
                <p>
                    <Link to="/game/lotto-generator">로또 생성기</Link>
                </p>
            </div>
            <div>
                <Route path="/game/:name" render={props => <GameMatcher {...props} moreProp='arnold' />}></Route>
                <Route exact path="/" render={props => <GameMatcher {...props} moreProp='arnold' />}></Route>
            </div>
        </BrowserRouter>
    );
};

export default Games;