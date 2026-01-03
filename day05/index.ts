import { readFileSync } from "node:fs";

export const solvePart1 = (input: string): number => {
  const sections = input.trim().split("\n\n");
  const rangeLines = sections[0]!.split("\n");
  const ingredientIds = sections[1]!.split("\n").map(Number);

  const ranges: [number, number][] = rangeLines.map((line) => {
    const [start, end] = line.split("-").map(Number);
    return [start!, end!];
  });

  let freshCount = 0;
  for (const id of ingredientIds) {
    const isFresh = ranges.some(([start, end]) => id >= start && id <= end);
    if (isFresh) {
      freshCount++;
    }
  }

  return freshCount;
};

export const solvePart2 = (input: string): number => {
  const sections = input.trim().split("\n\n");
  const rangeLines = sections[0]!.split("\n");

  const ranges: [number, number][] = rangeLines.map((line) => {
    const [start, end] = line.split("-").map(Number);
    return [start!, end!];
  });

  ranges.sort((a, b) => a[0] - b[0]);

  const merged: [number, number][] = [];
  let current = ranges[0]!;

  for (let i = 1; i < ranges.length; i++) {
    const range = ranges[i]!;

    if (range[0] <= current[1] + 1) {
      current = [current[0], Math.max(current[1], range[1])];
    } else {
      merged.push(current);
      current = range;
    }
  }
  merged.push(current);

  let totalCount = 0;
  for (const [start, end] of merged) {
    totalCount += end - start + 1;
  }

  return totalCount;
};

if (import.meta.main) {
  const input = readFileSync("day05/input.txt", "utf-8");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
