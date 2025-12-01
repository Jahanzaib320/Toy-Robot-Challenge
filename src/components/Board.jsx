import React from "react";
import "../styles/board.css";

export function Board({ size, robotPlaced, robotStyle, animKey }) {
  const rows = [];
  for (let row = size - 1; row >= 0; row--) {
    const cells = [];
    for (let col = 0; col < size; col++) {
      const isEven = (row + col) % 2 === 0;
      cells.push(
        <div
          key={col}
          className="board__cell"
          style={{ backgroundColor: isEven ? "#ffb3ba" : "#9ad0ff" }}
        />
      );
    }
    rows.push(
      <div key={row} className="board__row">
        {cells}
      </div>
    );
  }

  return (
    <div className="board-wrapper">
      <div className="board-axis board-axis--x">
        {Array.from({ length: size }, (_, i) => (
          <div key={i} className="board-axis__label">
            {i}
          </div>
        ))}
      </div>

      <div className="board-axis board-axis--y">
        {Array.from({ length: size }, (_, i) => (
          <div key={i} className="board-axis__label">
            {size - 1 - i}
          </div>
        ))}
      </div>

      <div className="board">
        {rows}
        {robotPlaced && (
          <div key={animKey} className="robot" style={robotStyle}>
            <div className="robot-icon">
              <div className="robot-body">
                <div className="robot-face">
                  <div className="robot-eye" />
                  <div className="robot-eye" />
                </div>
                <div className="robot-mouth" />
              </div>
              <div className="robot-signal robot-signal--left" />
              <div className="robot-signal robot-signal--right" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
