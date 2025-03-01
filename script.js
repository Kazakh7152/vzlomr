const board = document.getElementById('board');
let tiles = [];
const doorCode = Math.floor(1000 + Math.random() * 9000);

function createBoard() {
    let numbers = [...Array(15).keys()].map(n => n + 1);
    numbers.push(null);
    numbers = shuffleArray(numbers); // Перемешиваем изначально
    tiles = numbers.map(n => createTile(n));
    renderBoard();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createTile(number) {
    let tile = document.createElement('div');
    tile.className = number ? 'tile' : 'tile empty';
    if (number) tile.textContent = number;
    tile.addEventListener('click', () => moveTile(number));
    return tile;
}

function renderBoard() {
    board.innerHTML = '';
    tiles.forEach(tile => board.appendChild(tile));
}

function shuffleTiles() {
    let numbers = [...Array(15).keys()].map(n => n + 1);
    numbers.push(null);
    tiles = shuffleArray(numbers).map(n => createTile(n));
    renderBoard();
}

function moveTile(number) {
    let index = tiles.findIndex(tile => tile.textContent == number);
    let emptyIndex = tiles.findIndex(tile => tile.classList.contains('empty'));
    let [row, col] = [Math.floor(index / 4), index % 4];
    let [emptyRow, emptyCol] = [Math.floor(emptyIndex / 4), emptyIndex % 4];

    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        renderBoard();
        checkWin();
    }
}

function checkWin() {
    const winState = [...Array(15).keys()].map(n => (n + 1).toString()).concat([null]);
    if (tiles.map(t => t.textContent || null).toString() === winState.toString()) {
        setTimeout(() => alert(`Поздравляем! Ты справился с испытанием в Зоне! Код от двери: ${doorCode}`), 100);
    }
}

createBoard();
