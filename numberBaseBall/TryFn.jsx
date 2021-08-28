import React, { useState, memo } from 'react';

const TryFn = memo(({ tryInfo }) => {
    const [result, setResult] = useState(tryInfo.result);

    const onClick = () => setResult(1);

    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
});

export default TryFn;