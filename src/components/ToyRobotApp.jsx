import React, { useState, useMemo } from "react";
import { Board } from "./Board";
import { CommandPanel } from "./CommandPanel";
import { BOARD_SIZE, stepRobot } from "../logic/robotLogic";
import "../styles/layout.css";

export function ToyRobotApp() {
  const [input, setInput] = useState(
    "PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT"
  );
  const [placed, setPlaced] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [facing, setFacing] = useState("NORTH");
  const [history, setHistory] = useState([]);
  const [output, setOutput] = useState("");
  const [animKey, setAnimKey] = useState(0);

  const handleRun = () => {
    const lines = input
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    let state = { placed, x, y, facing };
    const newHistory = [];
    let lastReport = "";

    for (const cmd of lines) {
      const { state: nextState, historyEntry, report } = stepRobot(state, cmd);
      state = nextState;
      newHistory.push(historyEntry);
      if (report) {
        lastReport = report;
      }
    }

    setPlaced(state.placed);
    setX(state.x);
    setY(state.y);
    setFacing(state.facing);
    setHistory(newHistory);
    setOutput(lastReport);
    setAnimKey((k) => k + 1);
  };

  const handleReset = () => {
    setPlaced(false);
    setX(0);
    setY(0);
    setFacing("NORTH");
    setHistory([]);
    setOutput("");
    setAnimKey((k) => k + 1);
  };

  const robotStyle = useMemo(() => {
    const cellSize = 80;
    const padding = 8;
    const left = padding + x * cellSize;
    const top = padding + (BOARD_SIZE - 1 - y) * cellSize;
    return { transform: `translate(${left}px, ${top}px)` };
  }, [x, y, animKey]);

  return (
    <div className="app">
      <CommandPanel
        input={input}
        onInputChange={setInput}
        history={history}
        output={output}
        onRun={handleRun}
        onReset={handleReset}
      />
      <Board
        size={BOARD_SIZE}
        robotPlaced={placed}
        robotStyle={robotStyle}
        animKey={animKey}
      />
    </div>
  );
}
