let canvas;
let ctx;
let gBArrayHeight = 16;
let gBArrayWidth = 10;
let startX = 4;
let startY = 0;
let score = 0;
let linesCleared = 0;
let level = 1;
let gameOver = false;
let paused = false;
let nextTetromino = [];
let nextTetrominoColour;

let coordinateArray = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));
let curTetromino = [[1,0],[0,1],[1,1],[2,1]];
let tetrominos = [];
let tetrominoColours = ['purple','cyan','blue','yellow','orange','green','red'];
let curTetrominoColour;
let gameBoardArray = [...Array(16)].map(e => Array(10).fill(0));
let stoppedShapeArray = [...Array(16)].map(e => Array(10).fill(0));
let DIRECTION = { IDLE: 0, DOWN: 1, LEFT: 2, RIGHT: 3 };
let direction;

const BG = '#0f0f23';
const ACCENT = '#e94560';
const WHITE = '#ffffff';
const GREEN = '#00ff88';
const GREY_TEXT = '#aaaaaa';

class Coordinates {
    constructor(x, y) { this.x = x; this.y = y; }
}

document.addEventListener('DOMContentLoaded', SetupCanvas);

function CreateCoordArray() {
    let i = 0, j = 0;
    for (let y = 32; y <= 755; y += 45) {
        for (let x = 34; x <= 439; x += 45) {
            coordinateArray[i][j] = new Coordinates(x, y);
            i++;
        }
        j++; i = 0;
    }
}

function SetupCanvas() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 724;
    canvas.height = 822;

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let gx = 34; gx <= 439; gx += 45) {
        ctx.beginPath(); ctx.moveTo(gx, 32); ctx.lineTo(gx, 777); ctx.stroke();
    }
    for (let gy = 32; gy <= 777; gy += 45) {
        ctx.beginPath(); ctx.moveTo(19, gy); ctx.lineTo(497, gy); ctx.stroke();
    }

    ctx.shadowColor = ACCENT;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2;
    ctx.strokeRect(19, 26, 478, 779);
    ctx.shadowBlur = 0;
    ctx.lineWidth = 1;

    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = ACCENT;
    ctx.fillText('SCORE', 517, 48);
    ctx.strokeStyle = ACCENT;
    ctx.strokeRect(517, 55, 190, 42);
    ctx.fillStyle = WHITE;
    ctx.font = 'bold 20px monospace';
    ctx.fillText(score.toString(), 535, 78);

    ctx.fillStyle = ACCENT;
    ctx.font = 'bold 13px monospace';
    ctx.fillText('LEVEL', 517, 116);
    ctx.strokeRect(517, 123, 190, 42);
    ctx.fillStyle = WHITE;
    ctx.font = 'bold 20px monospace';
    ctx.fillText(level.toString(), 535, 146);

    ctx.fillStyle = ACCENT;
    ctx.font = 'bold 13px monospace';
    ctx.fillText('LINES', 517, 184);
    ctx.strokeRect(517, 191, 190, 42);
    ctx.fillStyle = WHITE;
    ctx.font = 'bold 20px monospace';
    ctx.fillText(linesCleared.toString(), 535, 214);

    ctx.fillStyle = ACCENT;
    ctx.font = 'bold 13px monospace';
    ctx.fillText('STATUS', 517, 252);
    ctx.strokeRect(517, 259, 190, 42);
    ctx.fillStyle = GREEN;
    ctx.font = 'bold 15px monospace';
    ctx.fillText('Playing', 535, 281);

    ctx.fillStyle = ACCENT;
    ctx.font = 'bold 13px monospace';
    ctx.fillText('NEXT', 517, 320);
    ctx.strokeRect(517, 327, 190, 110);

    ctx.fillStyle = ACCENT;
    ctx.font = 'bold 13px monospace';
    ctx.fillText('CONTROLS', 517, 458);
    ctx.fillStyle = GREY_TEXT;
    ctx.font = '12px monospace';
    ctx.fillText('A / \u2190   Move Left', 517, 476);
    ctx.fillText('D / \u2192   Move Right', 517, 493);
    ctx.fillText('S / \u2193   Move Down', 517, 510);
    ctx.fillText('E / \u2191   Rotate', 517, 527);
    ctx.fillText('Space   Hard Drop', 517, 544);
    ctx.fillText('P       Pause', 517, 561);

    document.addEventListener('keydown', HandleKeyPress);
    CreateTetrominos();
    CreateTetromino();
    CreateCoordArray();
    DrawTetromino();

    window._dropInterval = setInterval(function () {
        if (!gameOver && !paused) MoveTetrominoDown();
    }, 1000);
}

function DrawTetromino() {
    for (let i = 0; i < curTetromino.length; i++) {
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;
        gameBoardArray[x][y] = 1;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        DrawBeveledCell(coorX, coorY, curTetrominoColour);
    }
    DrawGhostPiece();
}

function DrawBeveledCell(coorX, coorY, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(coorX, coorY, 42, 42);
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.fillRect(coorX, coorY, 42, 3);
    ctx.fillRect(coorX, coorY, 3, 42);
    ctx.fillStyle = 'rgba(0,0,0,0.32)';
    ctx.fillRect(coorX, coorY + 39, 42, 3);
    ctx.fillRect(coorX + 39, coorY, 3, 42);
}

function DeleteTetromino() {
    for (let i = 0; i < curTetromino.length; i++) {
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;
        gameBoardArray[x][y] = 0;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = BG;
        ctx.fillRect(coorX, coorY, 42, 42);
        RedrawGridCell(coorX, coorY);
    }
}

function RedrawGridCell(coorX, coorY) {
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(coorX, coorY, 42, 42);
    ctx.lineWidth = 1;
}

function GetGhostPosition() {
    let ghostY = startY;
    while (true) {
        let collision = false;
        for (let i = 0; i < curTetromino.length; i++) {
            let x = curTetromino[i][0] + startX;
            let y = curTetromino[i][1] + ghostY + 1;
            if (y >= gBArrayHeight || typeof stoppedShapeArray[x][y] === 'string') { collision = true; break; }
        }
        if (collision) break;
        ghostY++;
    }
    return ghostY;
}

function DrawGhostPiece() {
    const ghostY = GetGhostPosition();
    if (ghostY === startY) return;
    for (let i = 0; i < curTetromino.length; i++) {
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + ghostY;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.strokeStyle = curTetrominoColour;
        ctx.lineWidth = 2;
        ctx.strokeRect(coorX + 1, coorY + 1, 40, 40);
        ctx.lineWidth = 1;
    }
}

function DeleteGhostPiece() {
    const ghostY = GetGhostPosition();
    for (let i = 0; i < curTetromino.length; i++) {
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + ghostY;
        if (y === curTetromino[i][1] + startY) continue;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = BG;
        ctx.fillRect(coorX, coorY, 42, 42);
        RedrawGridCell(coorX, coorY);
    }
}

function HardDrop() {
    const ghostY = GetGhostPosition();
    if (ghostY === startY) return;
    DeleteGhostPiece();
    DeleteTetromino();
    startY = ghostY;
    DrawTetromino();
    direction = DIRECTION.DOWN;
    CheckForVerticalCollison();
}

function DrawNextPiece() {
    ctx.fillStyle = BG;
    ctx.fillRect(518, 328, 188, 108);
    const previewX = 548;
    const previewY = 340;
    const cellSize = 28;
    for (let i = 0; i < nextTetromino.length; i++) {
        let x = nextTetromino[i][0];
        let y = nextTetromino[i][1];
        DrawBeveledCell(previewX + x * cellSize, previewY + y * cellSize, nextTetrominoColour);
    }
}

function TogglePause() {
    if (gameOver) return;
    paused = !paused;
    ctx.fillStyle = BG;
    ctx.fillRect(518, 260, 188, 40);
    ctx.fillStyle = paused ? ACCENT : GREEN;
    ctx.font = 'bold 15px monospace';
    ctx.fillText(paused ? 'Paused' : 'Playing', 535, 281);
}

function HandleKeyPress(key) {
    if (key.keyCode === 80) { TogglePause(); return; }
    if (!gameOver && !paused) {
        if (key.keyCode === 65 || key.keyCode === 37) {
            direction = DIRECTION.LEFT;
            if (!HittingTheWall() && !CheckForHorizontalCollision()) {
                DeleteGhostPiece(); DeleteTetromino(); startX--; DrawTetromino();
            }
        } else if (key.keyCode === 68 || key.keyCode === 39) {
            direction = DIRECTION.RIGHT;
            if (!HittingTheWall() && !CheckForHorizontalCollision()) {
                DeleteGhostPiece(); DeleteTetromino(); startX++; DrawTetromino();
            }
        } else if (key.keyCode === 83 || key.keyCode === 40) {
            MoveTetrominoDown();
        } else if (key.keyCode === 69 || key.keyCode === 38) {
            RotateTetromino();
        } else if (key.keyCode === 32) {
            key.preventDefault();
            HardDrop();
        }
    }
}

function MoveTetrominoDown() {
    direction = DIRECTION.DOWN;
    const collided = CheckForVerticalCollison();
    if (collided === false) {
        DeleteGhostPiece();
        DeleteTetromino();
        startY++;
        DrawTetromino();
    }
}

function CreateTetrominos() {
    tetrominos.push([[1,0],[0,1],[1,1],[2,1]]);
    tetrominos.push([[0,0],[1,0],[2,0],[3,0]]);
    tetrominos.push([[0,0],[0,1],[1,1],[2,1]]);
    tetrominos.push([[0,0],[1,0],[0,1],[1,1]]);
    tetrominos.push([[2,0],[0,1],[1,1],[2,1]]);
    tetrominos.push([[1,0],[2,0],[0,1],[1,1]]);
    tetrominos.push([[0,0],[1,0],[1,1],[2,1]]);
}

function CreateTetromino() {
    if (nextTetromino.length === 0) {
        let r1 = Math.floor(Math.random() * tetrominos.length);
        curTetromino = tetrominos[r1].map(s => [...s]);
        curTetrominoColour = tetrominoColours[r1];
    } else {
        curTetromino = nextTetromino.map(s => [...s]);
        curTetrominoColour = nextTetrominoColour;
    }
    let r2 = Math.floor(Math.random() * tetrominos.length);
    nextTetromino = tetrominos[r2].map(s => [...s]);
    nextTetrominoColour = tetrominoColours[r2];
    DrawNextPiece();
}

function HittingTheWall() {
    for (let i = 0; i < curTetromino.length; i++) {
        let newX = curTetromino[i][0] + startX;
        if (newX <= 0 && direction === DIRECTION.LEFT) return true;
        if (newX >= 9 && direction === DIRECTION.RIGHT) return true;
    }
    return false;
}

function CheckForVerticalCollison() {
    let tetrominoCopy = curTetromino.map(s => [...s]);
    let collision = false;
    for (let i = 0; i < tetrominoCopy.length; i++) {
        let square = tetrominoCopy[i];
        let x = square[0] + startX;
        let y = square[1] + startY;
        if (direction === DIRECTION.DOWN) y++;
        if (typeof stoppedShapeArray[x][y + 1] === 'string') {
            DeleteTetromino(); startY++; DrawTetromino();
            collision = true; break;
        }
        if (y >= 17) { collision = true; break; }
    }
    if (collision) {
        if (startY <= 2) {
            gameOver = true;
            ctx.fillStyle = BG;
            ctx.fillRect(518, 260, 188, 40);
            ctx.fillStyle = ACCENT;
            ctx.font = 'bold 15px monospace';
            ctx.fillText('Game Over', 535, 281);
        } else {
            for (let i = 0; i < tetrominoCopy.length; i++) {
                let square = tetrominoCopy[i];
                let x = square[0] + startX;
                let y = square[1] + startY;
                stoppedShapeArray[x][y] = curTetrominoColour;
            }
            CheckForCompletedRows();
            CreateTetromino();
            direction = DIRECTION.IDLE;
            startX = 4; startY = 0;
            DrawTetromino();
        }
    }
    return collision;
}

function CheckForHorizontalCollision() {
    let tetrominoCopy = curTetromino.map(s => [...s]);
    let collision = false;
    for (let i = 0; i < tetrominoCopy.length; i++) {
        let square = tetrominoCopy[i];
        let x = square[0] + startX;
        let y = square[1] + startY;
        if (direction === DIRECTION.LEFT) x--;
        else if (direction === DIRECTION.RIGHT) x++;
        if (typeof stoppedShapeArray[x][y] === 'string') { collision = true; break; }
    }
    return collision;
}

function CheckForCompletedRows() {
    let rowsToDelete = 0;
    let startOfDeletion = 0;
    for (let y = 0; y < gBArrayHeight; y++) {
        let completed = true;
        for (let x = 0; x < gBArrayWidth; x++) {
            let square = stoppedShapeArray[x][y];
            if (square === 0 || typeof square === 'undefined') { completed = false; break; }
        }
        if (completed) {
            if (startOfDeletion === 0) startOfDeletion = y;
            rowsToDelete++;
            for (let i = 0; i < gBArrayWidth; i++) {
                stoppedShapeArray[i][y] = 0;
                gameBoardArray[i][y] = 0;
                let coorX = coordinateArray[i][y].x;
                let coorY = coordinateArray[i][y].y;
                ctx.fillStyle = BG;
                ctx.fillRect(coorX, coorY, 42, 42);
                RedrawGridCell(coorX, coorY);
            }
        }
    }
    if (rowsToDelete > 0) {
        const lineScores = [0, 100, 300, 500, 800];
        score += (lineScores[rowsToDelete] || 800) * level;
        linesCleared += rowsToDelete;
        const newLevel = Math.floor(linesCleared / 10) + 1;
        if (newLevel !== level) {
            level = newLevel;
            clearInterval(window._dropInterval);
            const newSpeed = Math.max(100, 1000 - (level - 1) * 100);
            window._dropInterval = setInterval(function () {
                if (!gameOver && !paused) MoveTetrominoDown();
            }, newSpeed);
        }
        ctx.fillStyle = BG; ctx.fillRect(518, 56, 188, 40);
        ctx.fillStyle = WHITE; ctx.font = 'bold 20px monospace';
        ctx.fillText(score.toString(), 535, 78);
        ctx.fillStyle = BG; ctx.fillRect(518, 124, 188, 40);
        ctx.fillStyle = WHITE; ctx.fillText(level.toString(), 535, 146);
        ctx.fillStyle = BG; ctx.fillRect(518, 192, 188, 40);
        ctx.fillStyle = WHITE; ctx.fillText(linesCleared.toString(), 535, 214);
        MoveAllRowsDown(rowsToDelete, startOfDeletion);
    }
}

function MoveAllRowsDown(rowsToDelete, startOfDeletion) {
    for (let i = startOfDeletion - 1; i >= 0; i--) {
        for (let x = 0; x < gBArrayWidth; x++) {
            let y2 = i + rowsToDelete;
            let square = stoppedShapeArray[x][i];
            if (typeof square === 'string') {
                stoppedShapeArray[x][y2] = square;
                gameBoardArray[x][y2] = 1;
                let coorX = coordinateArray[x][y2].x;
                let coorY = coordinateArray[x][y2].y;
                DrawBeveledCell(coorX, coorY, square);
                stoppedShapeArray[x][i] = 0;
                gameBoardArray[x][i] = 0;
                coorX = coordinateArray[x][i].x;
                coorY = coordinateArray[x][i].y;
                ctx.fillStyle = BG; ctx.fillRect(coorX, coorY, 42, 42);
                RedrawGridCell(coorX, coorY);
            }
        }
    }
}

function GetLastSquareX() {
    let lastX = 0;
    for (let i = 0; i < curTetromino.length; i++) {
        if (curTetromino[i][0] > lastX) lastX = curTetromino[i][0];
    }
    return lastX;
}

function RotateTetromino() {
    const backup = curTetromino.map(s => [...s]);
    const tetrominoCopy = curTetromino.map(s => [...s]);
    const newRotation = tetrominoCopy.map(([x, y]) => [GetLastSquareX() - y, x]);
    const kicks = [0, -1, 1, -2, 2];
    for (const kick of kicks) {
        const kicked = newRotation.map(([x, y]) => [x + kick, y]);
        const outOfBounds = kicked.some(([x, y]) =>
            x < 0 || x >= gBArrayWidth || y < 0 || y >= gBArrayHeight ||
            (typeof stoppedShapeArray[x] !== 'undefined' && typeof stoppedShapeArray[x][y] === 'string')
        );
        if (!outOfBounds) {
            DeleteGhostPiece();
            DeleteTetromino();
            curTetromino = kicked;
            startX += kick;
            DrawTetromino();
            return;
        }
    }
    curTetromino = backup;
}
