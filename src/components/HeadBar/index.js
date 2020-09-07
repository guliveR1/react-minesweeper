import React, {useState} from 'react';
import './index.css';
import {useSelector, useDispatch} from 'react-redux';
import {startNewGame, toggleSuperman} from '../../actions/board';
import Swal from 'sweetalert2';

function generateErrorMessages(width, height, numOfMines) {
  const errorMessages = [];

  if (width < 1) errorMessages.push('Width cant be lower then 0.');
  if (height < 1) errorMessages.push('Height cant be lower then 0.');
  if (numOfMines < 1) errorMessages.push('Mines cant be lower then 0.');
  if (numOfMines > width * height) 
    errorMessages.push('There cant be more mines then available cells.');

  return errorMessages;
}

function dispatchNewGame(width, height, numOfMines, dispatch) {
  // Generate errors array
  const errors = generateErrorMessages(width, height, numOfMines);

  // If there are errors send an alert else start a new game
  if (errors.length === 0) {
    dispatch(startNewGame(+width, +height, +numOfMines));
  } else {
    Swal.fire({
      title: 'Invalid input', 
      html: errors.join('<br />'), 
      type: 'error'
    });
  }
}

function HeadBar() {
  const [width, setWidth] = useState(useSelector(state => state.boardReducer.width));
  const [height, setHeight] = useState(useSelector(state => state.boardReducer.height));
  const [numOfMines, setNumOfMines] = 
    useState(useSelector(state => state.boardReducer.numOfMines));
  const flagsLeft = useSelector(state => state.boardReducer.flagsLeft);
  const dispatch = useDispatch();

  return (
    <div className="head-bar" data-test="head-bar">
      <div className="input-group" data-test="width-input">
        <label>Width:</label> 
        <input 
          type="number" 
          value={width} 
          onChange={(event) => setWidth(event.target.value)} 
        />
      </div>

      <div className="input-group" data-test="height-input">
        <label>Height:</label> 
        <input 
          type="number" 
          value={height} 
          onChange={(event) => setHeight(event.target.value)}
        />
      </div>
      
      <div className="input-group" data-test="mines-input">
        <label>Mines:</label> 
        <input 
          type="number" 
          value={numOfMines} 
          onChange={(event) => setNumOfMines(event.target.value)}
        />
      </div>
        
      <div className="actions" data-test="head-bar-actions">
        <label>
          <input 
            data-test="superman-checkbox"
            type="checkbox" 
            onChange={() => dispatch(toggleSuperman())} 
          />
          Superman?
        </label>

        <button 
          onClick={() => dispatchNewGame(width, height, numOfMines, dispatch)}
          data-test="new-game-button"
        >
          New game
        </button>

        <span data-test="flags-left">Flags left: {flagsLeft}</span>
      </div>
    </div>
  );
}

export default HeadBar;