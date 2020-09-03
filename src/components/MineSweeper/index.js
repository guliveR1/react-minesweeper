import React, { useState } from 'react';
import './index.css';
import HeadBar from '../HeadBar';
import Board from '../Board';
import {useSelector} from 'react-redux';

function MineSweeper() {
  return (
    <div className="mine-sweeper">
        <HeadBar />
        <Board />
    </div>
  );
}

export default MineSweeper;