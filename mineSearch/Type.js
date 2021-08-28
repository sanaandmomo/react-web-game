const TYPE = {
    START_GAME: 0,
    OPEN_CELL: 1,
    CLICK_MINE: 2,
    FLAG_CELL: 3,
    FLAG_MINE_CELL: 4,
    QUESTION_CELL: 5,
    QUESTION_MINE_CELL: 6,
    NORMALIZE_CELL: 7,
    NORMALIZE_MINE_CELL: 8,
    CALC_GAME: 9,
    INCREMENT_TIMER: 10
};

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0
};

export const GAME_STATE = {
    READY: 0,
    RUN: 1,
    STOP: 2
};

export default TYPE;

