import React, { useReducer, useCallback } from 'react';
import Table from './Table';
import TYPE from './Type';

const getInitialState = () => ({
    gameState: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1]
});

const initialState = getInitialState();

const reducer = (state, action) => {
    const { gameState, turn, tableData, recentCell } = state;

    if (action.type != TYPE.REDO && gameState) return state;

    switch (action.type) {
        case TYPE.CLICK_CELL:
            const { row, cell } = action;
            const newTableData = [...tableData];
            newTableData[row] = [...tableData[row]];
            newTableData[row][cell] = turn;

            return {
                ...state, 
                tableData: newTableData,
                recentCell: [row, cell]
            };
        case TYPE.CHANGE_TURN: 
            return {
                ...state,
                turn: state.turn == 'O' ? 'X' : 'O'
            };
        case TYPE.REDO:
            return getInitialState();
        case TYPE.CALC_GAME: 
            const [recentRow, recentCol] = recentCell;
            const rowCheck = tableData[recentRow].every(cell => cell == turn);

            if (rowCheck) {
                return {
                    ...state,
                    gameState: `${turn} 승리`
                };
            }

            const arrs = Array(tableData.length).fill();
            const colCheck = arrs.every((_, row) => tableData[row][recentCol] == turn);

            if (colCheck) {
                return {
                    ...state,
                    gameState: `${turn} 승리`
                };
            }

            const leftDiagonalCheck = arrs.every((_, i) => tableData[i][i] == turn);

            if (leftDiagonalCheck) {
                return {
                    ...state,
                    gameState: `${turn} 승리`
                };
            }

            const rightDiagonalCheck = arrs.every((_, i) => tableData[i][tableData.length - i - 1] == turn);

            if (rightDiagonalCheck) {
                return {
                    ...state,
                    gameState: `${turn} 승리`
                };
            }

            const isDraw = tableData.every(row => row.every(col => col));

            if (isDraw) {
                return {
                    ...state,
                    gameState: '무승부'
                }
            }

            return state;
    }
};

const TicTacToe = () => {
    const [{ gameState, tableData }, dispatch] = useReducer(reducer, initialState);

    const onClickButtn = useCallback(() => {
        dispatch({ type: TYPE.REDO });
    }, []);

    console.log('tictactoe render');
    return (
        <>
        <Table tableData={tableData} dispatch={dispatch} />
        {gameState && <div>{gameState}</div>}
        {gameState && <button onClick={onClickButtn}>다시 하기</button>}
        </>
    );
};

export default TicTacToe;