import React from 'react';
import './index.css';
import bomb from '../../assets/images/mine.png';
import explode from '../../assets/images/explode.png';
import flag from '../../assets/images/flag.png';
import {useDispatch, useSelector} from 'react-redux';
import {revealCell, toggleFlag} from '../../actions/board';

function renderCell(cell, superman) {
  // If the cell is flagged render flag image
  if (cell.flagged) {
    return <img width="15" alt="flag" src={flag} />;
  }

  // If the cell is not revealed and superman mode is off render nothing
  if (!superman && !cell.revealed) {
    return '';
  };

  // If the cell is a bomb and is revealed render boom image, 
  // if the cell is not revealed and superman mode is on render mine image
  if (cell.value === -1 && (cell.revealed || superman)) {
    return cell.revealed ? 
      <img width="20" src={explode} alt="explode" /> : 
      <img width="20" src={bomb} alt="bomb" />;
  };

  return cell.value === 0 ? '' : cell.value;
}

function handleCellClick(event, cell, dispatch) {
  // Change the flag status if its not revealed
  if (!cell.revealed || cell.flagged) {
    // If the shift key was held during the click
    if (event.shiftKey) {
      dispatch(toggleFlag(cell));
    } else {
      dispatch(revealCell(cell));
    }
  }
}

function Cell({rowIndex, columnIndex, style}) {
  const cell = useSelector(state => state.boardReducer.board[rowIndex][columnIndex]);
  const superman = useSelector(state => state.boardReducer.superman);
  const dispatch = useDispatch();

  return (
    <div 
      onClick={(event) => handleCellClick(event, cell, dispatch)} 
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