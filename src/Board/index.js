import React from 'react';
import './index.css';
import Cell from '../Cell';
import {useState} from 'react';
import {initializeGameBoard, revealCell} from './Helpers/board.helper';

function Board() {
  const [gameBoard, setGameBoard] = useState(initializeGameBoard(10, 10, 20));

  const handleCellClick = (cell) => {
    revealCell(gameBoard, cell.rowIndex, cell.colIndex);
    setGameBoard([...gameBoard]);
  };

  return (
    <div className="board">
      {gameBoard.map((row, rowIndex) => 
        <div key={rowIndex} className="row">
          {
            row.map((col, colIndex) => <Cell onCellClick={handleCellClick} key={colIndex} cell={col} />)
          }
        </div>
      )}
    </div>
  );
}

export default Board;