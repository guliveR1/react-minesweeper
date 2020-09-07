import {useSelector, useDispatch} from 'react-redux';
import {startNewGame} from '../../actions/board';
import Swal from 'sweetalert2';

export default function GameResult() {
    const numOfMines = useSelector(state => state.boardReducer.numOfMines);
    const flaggedMines = useSelector(state => state.boardReducer.flaggedMines);
    const lost = useSelector(state => state.boardReducer.lost);
    const dispatch = useDispatch();
  
    // If all mines was flagged
    if (numOfMines === flaggedMines) {
      Swal.fire('Yay!', 'Congratulations, You win!', 'success').then(() => {
        dispatch(startNewGame());
      });
    }
  
    // If lost flag was set to true
    if (lost) {
      Swal.fire('Boom!', 'Oh no, you lose!', 'error').then(() => {
        dispatch(startNewGame());
      });
    }

    return '';
}