import React from 'react';
import './index.css';
import HeadBar from '../HeadBar';
import Board from '../Board';
import GameResult from '../GameResult';

function MineSweeper() {
  return (
    <div className="mine-sweeper" data-test="mine-sweeper">
        <HeadBar />
        <Board />
        <GameResult />
    </div>
  );
}

export default MineSweeper;