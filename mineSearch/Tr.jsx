import React, { memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowIndex, rowData }) => {

    // console.log('tr render');
    return (
        <tr>
            {rowData.map((cellData, i) => <Td key={`td${i}`} rowIndex={rowIndex} colIndex={i} cellData={cellData}/>)}
        </tr>
    );
});

export default Tr;