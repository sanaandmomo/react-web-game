import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
    console.log('table render');
    return (
        <table>   
            {tableData.map((rowData, i) => <Tr key={`tr${i}`} rowIndex={i} rowData={rowData} dispatch={dispatch} />)}
        </table>
    );
};

export default Table;