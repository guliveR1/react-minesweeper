import React from 'react';
import './index.css';

function renderCell(cell) {
  if (cell.flagged) return '🚩';
  if (!cell.revealed) return '';
  if (cell.value === -1) return '💣';

  return cell.value;
}

function Cell({cell, onCellClick}) {
  return (
    <div onClick={() => onCellClick(cell)} className={"col " + (cell.revealed ? "revealed" : "")}>
        {renderCell(cell)}
    </div>
  );
}

export default Cell;