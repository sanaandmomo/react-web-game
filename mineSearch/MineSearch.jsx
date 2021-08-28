import React, { useReducer, useMemo, useEffect, useRef } from 'react';
import Table from './Table';
import Form from './Form';
import TableContext from './tableContext';
import TYPE, { CODE, GAME_STATE } from './Type';

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    state: GAME_STATE.READY,
};

const plantMine = (row, col, mine) => {
    const candidate = Array(row * col).fill().map((_, i) => i);
    const shuffle = Array(mine).fill().map(_ => candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    const tableData = Array(row).fill().map(_ => Array(col).fill().map(_ => CODE.NORMAL));
    
    shuffle.forEach(minePos => {
        const ver = Math.floor(minePos / col);
        const hor = minePos % col;
        tableData[ver][hor] = CODE.MINE;
    });

    return tableData;
};

const copyArray = (arr, row) => {
    const newArr = [...arr];

    newArr[row] = [...arr[row]];

    return newArr;
};

const reducer = (state, action) => {
    switch(action.type) {
        case TYPE.START_GAME: {
            const { row, col, mine } = action;
            return {
                ...initialState,
                tableData: plantMine(...[row, col, mine].map(Number)),
                state: GAME_STATE.RUN
            };
        }
        case TYPE.OPEN_CELL: {
            const { row, col } = action;
            const tableData = [...state.tableData];
            const moves = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1]
            ];
            const isRange = (y, x) => (0 <= y && y < tableData.length && 0 <= x && x < tableData[0].length);
            const visit = Array(tableData.length).fill().map(_ => Array(tableData[0].length).fill().map(_ => 0));

            tableData.forEach((_, i) => tableData[i] = [...state.tableData[i]]);
            
            (function f(y, x) { 
                const mineCount = moves.reduce((m, [my, mx]) => {
                    const ny = y + my;
                    const nx = x + mx;
    
                    m += isRange(ny, nx) && [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(tableData[ny][nx]) ? 1 : 0;
                    return m;
                }, 0);

                tableData[y][x] = mineCount;
                visit[y][x] = 1;

                if (!mineCount) {
                    moves.forEach(([my, mx]) => {
                        const ny = y + my;
                        const nx = x + mx;
                        
                        isRange(ny, nx) && !visit[ny][nx] && f(ny, nx);
                    });
                }
            })(row, col);

            return {
                ...state,
                tableData
            };
        }   
        case TYPE.CLICK_MINE: {
            const { row, col } = action;
            const tableData = copyArray(state.tableData, row);
            tableData[row][col] = CODE.CLICKED_MINE;

            return {
                ...state,
                tableData,
                halted: true,
                result: '패배',
                state: GAME_STATE.STOP
            };
        }
        case TYPE.FLAG_CELL: {
            const { row, col } = action;
            const tableData = copyArray(state.tableData, row);
            tableData[row][col] = CODE.FLAG;

            return {
                ...state,
                tableData
            };
        }
        case TYPE.FLAG_MINE_CELL: {
            const { row, col } = action;
            const tableData = copyArray(state.tableData, row);
            tableData[row][col] = CODE.FLAG_MINE;

            return {
                ...state,
                tableData
            };
        }
        case TYPE.QUESTION_CELL: {
            const { row, col } = action;
            const tableData = copyArray(state.tableData, row);
            tableData[row][col] = CODE.QUESTION;

            return {
                ...state,
                tableData
            };
        }
        case TYPE.QUESTION_MINE_CELL: {
            const { row, col } = action;
            const tableData = copyArray(state.tableData, row);
            tableData[row][col] = CODE.QUESTION_MINE;

            return {
                ...state,
                tableData
            };
        }
        case TYPE.NORMALIZE_CELL: {
            const { row, col } = action;
            const tableData = copyArray(state.tableData, row);
            tableData[row][col] = CODE.NORMAL;

            return {
                ...state,
                tableData
            };
        }
        case TYPE.NORMALIZE_MINE_CELL: {
            const { row, col } = action;
            const tableData = copyArray(state.tableData, row);
            tableData[row][col] = CODE.MINE;

            return {
                ...state,
                tableData
            };
        }
        case TYPE.CALC_GAME: {
            const { tableData } = state;
            const isVictory = tableData.every(row => row.every(cell => cell != CODE.NORMAL));

            return {
                ...state,
                halted: isVictory,
                result: isVictory ? '승리' : state.result,
                state: isVictory ? GAME_STATE.STOP : state.state
            }
        }
        case TYPE.INCREMENT_TIMER: {
            const timer = state.timer + 1;

            return {
                ...state,
                timer
            };
        }
        default:
            return state;
    }
}

const MineSearch = () => {
    const [{ tableData , timer, result, state }, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({ tableData, state, dispatch }), [tableData, state]);

    useEffect(() => {
        if (state != GAME_STATE.RUN) return;

        const interval = setInterval(() => dispatch({ type: TYPE.INCREMENT_TIMER }), 1000);

        return () => clearInterval(interval);
    }, [state]);

    return (
        <>
            <TableContext.Provider value={value}>
                <Form />
                <div>{timer}</div>
                <Table />
                <div>{result}</div>
            </TableContext.Provider>
        </>
    );
};

export default MineSearch;