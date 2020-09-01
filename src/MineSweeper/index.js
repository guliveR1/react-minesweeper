import React from 'react';
import './index.css';
import HeadBar from '../HeadBar';
import Board from '../Board';

function MineSweeper() {
  return (
    <div className="mine-sweeper">
        <HeadBar />
        <Board width={10} height={10} numOfMines={20} />
    </div>
  );
}

export default MineSweeper;