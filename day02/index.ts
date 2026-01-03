import { readFileSync } from "node:fs";

const isRepeatedTwice = (id: number): boolean => {
  const str = id.toString();
  if (str.length % 2 !== 0) return false;

  const halfLen = str.length / 2;
  return str.substring(0, halfLen) === str.substring(halfLen);
};

const isRepeatedPattern = (id: number): boolean => {
  const str = id.toString();
  const len = str.length;

  for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
    if (len % patternLen !== 0) continue;

    const pattern = str.substring(0, patternLen);
    let matches = true;

    for (let i = patternLen; i < len; i += patternLen) {
      if (str.substring(i, i + patternLen) !== pattern) {
        matches = false;
        break;
      }
    }

    if (matches) return true;
  }

  return false;
};

export const solvePart1 = (input: string): number => {
  const ranges = input.trim().split(',');
  let sum = 0;

  for (const range of ranges) {
    const parts = range.split('-').map(Number);
    const start = parts[0];
    const end = parts[1];

    if (start === undefined || end === undefined) continue;

    for (let id = start; id <= end; id++) {
      if (isRepeatedTwice(id)) {
        sum += id;
      }
    }
  }

  return sum;
};

export const solvePart2 = (input: string): number => {
  const ranges = input.trim().split(',');
  let sum = 0;

  for (const range of ranges) {
    const parts = range.split('-').map(Number);
    const start = parts[0];
    const end = parts[1];

    if (start === undefined || end === undefined) continue;

    for (let id = start; id <= end; id++) {
      if (isRepeatedPattern(id)) {
        sum += id;
      }
    }
  }

  return sum;
};

if (import.meta.main) {
  const input = readFileSync("day02/input.txt", "utf-8");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
