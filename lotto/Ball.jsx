import React, { PureComponent } from 'react';

class Ball extends PureComponent {
    backgrounds = ['red', 'orange', 'yellow', 'blue', 'green'];

    render() {
        const { number } = this.props;
        const background = this.backgrounds.find((_, i) => number <= (i + 1) * 10);

        return <div className="ball" style={{ background }}>{number}</div>
    }
}

export default Ball;