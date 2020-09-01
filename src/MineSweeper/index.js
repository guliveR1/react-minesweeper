import React, { useState } from 'react';
import './index.css';
import HeadBar from '../HeadBar';
import Board from '../Board';

function MineSweeper() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [numOfMines, setNumOfMines] = useState(10);

  return (
    <div className="mine-sweeper">
        <HeadBar />
        <Board width={width} height={height} numOfMines={numOfMines} />
    </div>
  );
}

export default MineSweeper;