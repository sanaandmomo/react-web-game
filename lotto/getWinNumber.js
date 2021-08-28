const getWinNumbers = () => {
    console.log('getWinNumbers');

    const SIZE = 45;
    const candidate = Array(SIZE).fill().map((_, i) => i + 1);
    const suffle = Array(SIZE).fill().map(_ => candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);

    const bonusNumber = suffle[SIZE - 1];
    const winNumbers = suffle.slice(0, 6).sort((a, b) => a - b);

    return [...winNumbers, bonusNumber];
};

export default getWinNumbers;