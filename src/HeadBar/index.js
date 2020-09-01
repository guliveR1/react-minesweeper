import React from 'react';
import './index.css';

function HeadBar() {
  return (
    <div className="head-bar">
        <input type="number" placeholder="width" />
        <input type="number" placeholder="height" />
        <input type="number" placeholder="mines" />
        <button>New game</button>
        <input type="checkbox" /> superman
        Flags left: 10
    </div>
  );
}

export default HeadBar;