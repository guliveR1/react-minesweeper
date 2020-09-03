import React from 'react';
import './index.css';
import Cell from '../Cell';
import {useSelector} from 'react-redux';

function Board() {
  const board = useSelector(state => state.boardReducer.board);

  return (
    <div className="board">
      {board.map((row, rowIndex) => 
        <div key={rowIndex} className="row">
          {
            row.map((_, colIndex) => <Cell 
                                      key={colIndex + '' + rowIndex} 
                                      row={rowIndex} 
                                      column={colIndex} />)
          }
        </div>
      )}
    </div>
  );
}

export default Board;