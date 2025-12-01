import React from "react";
import "../styles/panel.css";

export function CommandPanel({
  input,
  onInputChange,
  history,
  output,
  onRun,
  onReset,
}) {
  return (
    <div className="panel">
      <h2 className="panel__title">Toy Robot Simulator</h2>

      <textarea
        className="panel__textarea"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Tell the robot what to do..."
      />

      <div className="panel__buttons">
        <button className="btn btn--primary" onClick={onRun}>
          Run
        </button>
        <button className="btn btn--secondary" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="panel__history">
        {history.length === 0 ? (
          <div className="panel__history-empty">No commands run yet.</div>
        ) : (
          history.map((h, i) => (
            <div key={i} className="panel__history-line">
              <span>&gt; {h.cmd}</span>
              {h.note && <span className="panel__history-note"> — {h.note}</span>}
            </div>
          ))
        )}
      </div>

      <div className="panel__output">
        <strong>Last REPORT:</strong>{" "}
        {output ? (
          <span>{output}</span>
        ) : (
          <span className="panel__output-empty">None</span>
        )}
      </div>
    </div>
  );
}
