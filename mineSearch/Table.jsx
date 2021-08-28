import React, { useContext } from 'react';
import TableContext from './tableContext';
import Tr from './Tr';

const Table = () => {
    const { tableData } = useContext(TableContext);
    // console.log('table render');
    return (
        <table>
            {tableData.map((rowData, i) => <Tr key={`tr${i}`} rowIndex={i} rowData={rowData}/>)}
        </table>
    );
};

export default Table;