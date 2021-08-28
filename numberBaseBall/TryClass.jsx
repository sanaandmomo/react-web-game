import React, { PureComponent } from 'react';

class TryClass extends PureComponent {
    state = { ...this.props };
    
    render() {
        const { tryInfo } = this.props;

        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}

export default TryClass;