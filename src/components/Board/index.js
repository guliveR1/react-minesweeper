import React from 'react';
import './index.css';
import config from '../../config.json';
import Cell from '../Cell';
import {useSelector} from 'react-redux';
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function renderBoard(boardWidth, boardHeight) {
  if (boardWidth * boardHeight > config.virtualizeAfter) {
    return <AutoSizer>
      {({ height, width }) => (
        <Grid
          columnCount={boardHeight}
          columnWidth={60}
          height={height}
          rowCount={boardWidth}
          rowHeight={60}
          width={width}
        >
          {Cell}
        </Grid>
      )}
    </AutoSizer>;
  }

  return Array.from({length: boardWidth}, (_, rowIndex) => 
    <div key={rowIndex} className="row">
    {
      Array.from({length: boardHeight}, (_, colIndex) => <Cell 
                  key={colIndex + '' + rowIndex} 
                  rowIndex={rowIndex} 
                  columnIndex={colIndex} />)
    }
    </div>
  );
}

function Board() {
  const width = useSelector(state =>  state.boardReducer.width);
  const height = useSelector(state =>  state.boardReducer.height);
  
  return (
    <div className="board" style={{overflow: width * height > config.virtualizeAfter ? 'hidden' : 'auto'}}>
      {renderBoard(width, height)}
    </div>
  );
}

export default Board;