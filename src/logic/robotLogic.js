export const BOARD_SIZE = 5;
export const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];

const dirToVector = {
  NORTH: { dx: 0, dy: 1 },
  EAST: { dx: 1, dy: 0 },
  SOUTH: { dx: 0, dy: -1 },
  WEST: { dx: -1, dy: 0 },
};

export function isValidPos(x, y) {
  return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
}

export function rotateDirection(facing, turn) {
  const idx = DIRECTIONS.indexOf(facing);
  if (idx === -1) return facing;
  const delta = turn === "LEFT" ? -1 : 1;
  return DIRECTIONS[(idx + delta + DIRECTIONS.length) % DIRECTIONS.length];
}

export function stepRobot(state, command) {
  const raw = command;
  const line = raw.toUpperCase();
  const historyEntry = { cmd: raw };
  let { placed, x, y, facing } = state;
  let report = null;

  if (line.startsWith("PLACE")) {
    const match = line.match(
      /^PLACE\s+(\d+)\s*,\s*(\d+)\s*,\s*(NORTH|SOUTH|EAST|WEST)$/
    );
    if (!match) {
      historyEntry.note = "Invalid PLACE format (ignored)";
      return { state, historyEntry, report };
    }
    const nx = parseInt(match[1], 10);
    const ny = parseInt(match[2], 10);
    const nf = match[3];
    if (!isValidPos(nx, ny)) {
      historyEntry.note = "PLACE off board (ignored)";
      return { state, historyEntry, report };
    }
    return {
      state: { placed: true, x: nx, y: ny, facing: nf },
      historyEntry,
      report,
    };
  }

  if (!placed) {
    historyEntry.note = "Robot not placed yet (ignored)";
    return { state, historyEntry, report };
  }

  if (line === "MOVE") {
    const v = dirToVector[facing];
    const nx = x + v.dx;
    const ny = y + v.dy;
    if (isValidPos(nx, ny)) {
      return {
        state: { placed, x: nx, y: ny, facing },
        historyEntry,
        report,
      };
    }
    historyEntry.note = "Move would fall off (ignored)";
    return { state, historyEntry, report };
  }

  if (line === "LEFT" || line === "RIGHT") {
    const nf = rotateDirection(facing, line);
    return {
      state: { placed, x, y, facing: nf },
      historyEntry,
      report,
    };
  }

  if (line === "REPORT") {
    report = `${x},${y},${facing}`;
    historyEntry.note = `OUTPUT: ${report}`;
    return { state, historyEntry, report };
  }

  historyEntry.note = "Unknown command (ignored)";
  return { state, historyEntry, report };
}
