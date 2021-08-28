import React, { memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    console.log('tr render');
    return (
        <tr>
            {rowData.map((v, i) => <Td key={`td${i}`} rowIndex={rowIndex} cellIndex={i} cellData={v} dispatch={dispatch}/>)}
        </tr>
    );
});

export default Tr;