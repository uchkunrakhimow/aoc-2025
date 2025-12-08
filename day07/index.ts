import { read } from "../utils/read.ts";

export const solvePart1 = (input: string): number => {
  const lines = input.trim().split("\n");
  const grid = lines.map((line) => line.split(""));

  const height = grid.length;
  const width = grid[0]?.length ?? 0;

  let startRow = -1;
  let startCol = -1;
  for (let r = 0; r < height; r++) {
    const row = grid[r];
    if (!row) continue;
    for (let c = 0; c < width; c++) {
      if (row[c] === "S") {
        startRow = r;
        startCol = c;
        break;
      }
    }
    if (startRow !== -1) break;
  }

  let splitCount = 0;
  const activatedSplitters = new Set<string>();

  let currentBeams = new Set<string>();
  currentBeams.add(`${startRow},${startCol}`);

  while (currentBeams.size > 0) {
    const nextBeams = new Set<string>();

    for (const beamKey of currentBeams) {
      const parts = beamKey.split(",").map(Number);
      const row = parts[0];
      const col = parts[1];
      if (row === undefined || col === undefined) continue;

      const nextRow = row + 1;
      if (nextRow >= height) {
        continue;
      }

      const nextRowData = grid[nextRow];
      if (!nextRowData) continue;

      if (nextRowData[col] === "^") {
        const splitterKey = `${nextRow},${col}`;
        if (!activatedSplitters.has(splitterKey)) {
          activatedSplitters.add(splitterKey);
          splitCount++;

          if (col - 1 >= 0) {
            nextBeams.add(`${nextRow},${col - 1}`);
          }
          if (col + 1 < width) {
            nextBeams.add(`${nextRow},${col + 1}`);
          }
        }
      } else {
        nextBeams.add(`${nextRow},${col}`);
      }
    }

    currentBeams = nextBeams;
  }

  return splitCount;
};

export const solvePart2 = (input: string): number => {
  const lines = input.trim().split("\n");
  const grid = lines.map((line) => line.split(""));

  const height = grid.length;
  const width = grid[0]?.length ?? 0;

  let startRow = -1;
  let startCol = -1;
  for (let r = 0; r < height; r++) {
    const row = grid[r];
    if (!row) continue;
    for (let c = 0; c < width; c++) {
      if (row[c] === "S") {
        startRow = r;
        startCol = c;
        break;
      }
    }
    if (startRow !== -1) break;
  }

  const memo = new Map<string, number>();

  const countPaths = (row: number, col: number): number => {
    if (col < 0 || col >= width) {
      return 0;
    }

    if (row >= height) {
      return 1;
    }

    const key = `${row},${col}`;
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    const nextRow = row + 1;

    if (nextRow >= height) {
      memo.set(key, 1);
      return 1;
    }

    let result: number;
    const nextRowData = grid[nextRow];
    if (nextRowData && nextRowData[col] === "^") {
      const leftPaths = countPaths(nextRow, col - 1);
      const rightPaths = countPaths(nextRow, col + 1);
      result = leftPaths + rightPaths;
    } else {
      result = countPaths(nextRow, col);
    }

    memo.set(key, result);
    return result;
  };

  return countPaths(startRow, startCol);
};

if (import.meta.main) {
  const input = read(7);
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
