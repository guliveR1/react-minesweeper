import React from 'react';
import './index.css';
import Cell from '../Cell';
import {useState, useEffect} from 'react';
import {initializeGameBoard, revealCell, flagCell} from './Helpers/board.helper';

function Board({width, height, numOfMines}) {
  const [gameBoard, setGameBoard] = useState(initializeGameBoard(width, height, numOfMines));

  const handleCellClick = (event, cell) => {
    // Check if shift key was held
    if (event.shiftKey) {
      flagCell(cell);
    } else {
      const lost = revealCell(gameBoard, cell);

      if (lost) {
        alert('you lose!');
      }
    }

    // Update the state to re render the board
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