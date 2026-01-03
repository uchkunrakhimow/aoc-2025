import { readFileSync } from "node:fs";

export const solvePart1 = (input: string) => {
  const lines = input.trim().split("\n");

  return lines.reduce((total: number, line: string) => {
    let max = 0;

    for (let i = 0; i < line.length; i++) {
      for (let j = i + 1; j < line.length; j++) {
        max = Math.max(max, parseInt(line[i]! + line[j]!));
      }
    }

    return total + max;
  }, 0);
};

export const solvePart2 = (input: string) => {
  const lines = input.trim().split("\n");

  return Number(lines.reduce((total: bigint, line: string) => {
    const result = [];
    let start = 0;

    for (let i = 0; i < 12; i++) {
      const end = line.length - (11 - i);
      let maxDigit = "0";
      let maxPos = start;

      for (let j = start; j < end; j++) {
        if (line[j]! > maxDigit) {
          maxDigit = line[j]!;
          maxPos = j;
        }
      }

      result.push(maxDigit);
      start = maxPos + 1;
    }

    return total + BigInt(result.join(""));
  }, BigInt(0)));
};

if (import.meta.main) {
  const input = readFileSync("day03/input.txt", "utf-8");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
