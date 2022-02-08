"use strict";
const table = document.createElement('table');
const rows = [];
const cells = [];
let turn = 'X';
const result = document.createElement('div');
let count = 0;
function callback(event) {
    const rowIndex = rows.indexOf(event.currentTarget.parentNode);
    const cellIndex = cells[rowIndex].indexOf(event.currentTarget);
    console.log(rowIndex, cellIndex);
    count++;
    if (cells[rowIndex][cellIndex].textContent !== '') {
        console.log('빈 칸이 아닙니다.');
    }
    else {
        cells[rowIndex][cellIndex].textContent = turn;
        let full = false;
        if (cells[rowIndex][0].textContent === turn &&
            cells[rowIndex][1].textContent === turn &&
            cells[rowIndex][2].textContent === turn) {
            full = true;
        }
        if (cells[0][cellIndex].textContent === turn &&
            cells[1][cellIndex].textContent === turn &&
            cells[2][cellIndex].textContent === turn) {
            full = true;
        }
        if (cells[0][0].textContent === turn &&
            cells[1][1].textContent === turn &&
            cells[2][2].textContent === turn) {
            full = true;
        }
        if (cells[0][2].textContent === turn &&
            cells[1][1].textContent === turn &&
            cells[2][0].textContent === turn) {
            full = true;
        }
        if (full) {
            result.textContent = `${turn}님이 승리!`;
            resetGame();
        }
        else if (count === 9) {
            result.textContent = `무승부!`;
            resetGame();
        }
        else {
            turn = turn === 'O' ? 'X' : 'O';
        }
    }
}
function resetGame() {
    turn = 'X';
    cells.forEach((row) => {
        row.forEach((cell) => {
            cell.textContent = '';
        });
    });
    count = 0;
}
for (let i = 1; i <= 3; i++) {
    const row = document.createElement('tr');
    rows.push(row);
    cells.push([]);
    for (let j = 1; j <= 3; j++) {
        const cell = document.createElement('td');
        cell.addEventListener('click', callback);
        cells[i - 1].push(cell);
        row.appendChild(cell);
    }
    table.appendChild(row);
}
document.body.appendChild(table);
document.body.appendChild(result);
