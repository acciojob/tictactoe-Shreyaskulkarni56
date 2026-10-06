const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submit = document.getElementById("submit");

const setup = document.getElementById("setup");
const game = document.getElementById("game");
const message = document.querySelector(".message");

let player1;
let player2;
let currentPlayer = 1;

let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

submit.addEventListener("click", function () {

    player1 = player1Input.value;
    player2 = player2Input.value;

    if (player1 === "" || player2 === "") {
        return;
    }

    setup.style.display = "none";
    game.style.display = "block";

    message.textContent = `${player1}, you're up`;
});

document.querySelectorAll(".cell").forEach(function (cell) {

    cell.addEventListener("click", function () {

        const position = Number(cell.id);

        if (board[position] !== "") {
            return;
        }

        if (currentPlayer === 1) {
            cell.textContent = "x";
            board[position] = "x";
        } else {
            cell.textContent = "o";
            board[position] = "o";
        }

        if (checkWinner()) {
            const winner = currentPlayer === 1 ? player1 : player2;
            message.textContent = `${winner} congratulations you won!`;
            return;
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1;

        if (currentPlayer === 1) {
            message.textContent = `${player1}, you're up`;
        } else {
            message.textContent = `${player2}, you're up`;
        }
    });
});

function checkWinner() {

    for (let combination of winningCombinations) {

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            return true;
        }
    }

    return false;
}
