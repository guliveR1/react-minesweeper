import React from 'react';
import './index.css';
import bomb from '../../assets/images/mine.png';
import explode from '../../assets/images/explode.png';
import flag from '../../assets/images/flag.png';
import {useDispatch, useSelector} from 'react-redux';
import {revealCell, toggleFlag} from '../../actions/board';

function renderCell(cell, superman) {
  if (cell.flagged) return <img width="15" alt="flag" src={flag} />;
  
  if (!superman) {
    if (!cell.revealed || cell.value === 0) return '';
    if (cell.value === -1) return <img width="20" alt="explode" src={explode} />;
  } else {
    if (cell.value === -1) return cell.revealed ? <img width="20" src={explode} alt="explode" /> : <img width="20" src={bomb} alt="bomb" />;
    if (cell.value === 0) return '';
  }

  return cell.value;
}

function Cell({rowIndex, columnIndex, style}) {
  const cell = useSelector(state => state.boardReducer.board[rowIndex][columnIndex]);
  const superman = useSelector(state => state.boardReducer.superman);
  const dispatch = useDispatch();

  const handleCellClick = (event, cell) => {
    // If the shift key was held during the click
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
      style={{
        ...style, 
        border: '1px solid black'
      }}
    >
        {renderCell(cell, superman)}
    </div>
  );
};

export default Cell;