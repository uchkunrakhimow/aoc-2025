import { read } from "../utils/read.ts";

export const solvePart1 = (input: string) => {
  const grid = input.trim().split("\n");
  const rows = grid.length;
  const cols = grid[0]!.length;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  let accessible = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row]![col] === "@") {
        let adjacent = 0;

        for (const [dr, dc] of directions) {
          const nr = row + dr!;
          const nc = col + dc!;

          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr]![nc] === "@") {
            adjacent++;
          }
        }

        if (adjacent < 4) {
          accessible++;
        }
      }
    }
  }

  return accessible;
};

export const solvePart2 = (input: string) => {
  const grid = input.trim().split("\n").map(line => line.split(""));
  const rows = grid.length;
  const cols = grid[0]!.length;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  const countAdjacent = (row: number, col: number) => {
    let count = 0;
    for (const [dr, dc] of directions) {
      const nr = row + dr!;
      const nc = col + dc!;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr]![nc] === "@") {
        count++;
      }
    }
    return count;
  };

  let totalRemoved = 0;

  while (true) {
    const toRemove: Array<[number, number]> = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row]![col] === "@" && countAdjacent(row, col) < 4) {
          toRemove.push([row, col]);
        }
      }
    }

    if (toRemove.length === 0) break;

    for (const [row, col] of toRemove) {
      grid[row]![col] = ".";
    }

    totalRemoved += toRemove.length;
  }

  return totalRemoved;
};

if (import.meta.main) {
  const input = read(4);
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
