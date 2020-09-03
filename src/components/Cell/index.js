import React from 'react';
import './index.css';
import {useDispatch, useSelector} from 'react-redux';
import {revealCell, toggleFlag} from '../../actions/board';

function renderCell(cell) {
  if (cell.flagged) return '🚩';
  if (!cell.revealed || cell.value === 0) return '';
  if (cell.value === -1) return '💥';

  return cell.value;
}

function Cell({row, column}) {
  const cell = useSelector(state => state.boardReducer.board[row][column]);
  const dispatch = useDispatch();

  const handleCellClick = (event, cell) => {
    if (event.shiftKey) {
      dispatch(toggleFlag(cell));
    } else {
      dispatch(revealCell(cell));
    }
  }

  return (
    <div 
      onClick={(event) => handleCellClick(event, cell)} 
      className={"col " + (cell.revealed ? "revealed" : "")}
    >
        {renderCell(cell)}
    </div>
  );
};

export default Cell;