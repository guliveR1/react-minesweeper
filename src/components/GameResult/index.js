import {useSelector, useDispatch} from 'react-redux';
import {startNewGame} from '../../actions/board';
import Swal from 'sweetalert2';

export default function GameResult() {
    const numOfMines = useSelector(state => state.boardReducer.numOfMines);
    const flaggedMines = useSelector(state => state.boardReducer.flaggedMines);
    const lost = useSelector(state => state.boardReducer.lost);
    const dispatch = useDispatch();
  
    if (numOfMines === flaggedMines) {
      Swal.fire('Congratulations, You win!').then(() => {
        dispatch(startNewGame());
      });
    }
  
    if (lost) {
      Swal.fire('Boom!', 'Oh no, you lose!', 'error').then(() => {
        dispatch(startNewGame());
      });
    }

    return '';
}