import { readFileSync } from "node:fs";

const mod = (n: number, m: number): number => ((n % m) + m) % m;

export const solvePart1 = (input: string): number => {
  let pos = 50;
  let count = 0;

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const dir = line[0];
      const dist = parseInt(line.slice(1));

      pos = dir === "L" ? mod(pos - dist, 100) : mod(pos + dist, 100);

      if (pos === 0) count++;
    });

  return count;
};

export const solvePart2 = (input: string): number => {
  let pos = 50;
  let count = 0;

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const dir = line[0];
      const dist = parseInt(line.slice(1));

      // Count how many clicks land exactly on 0
      if (dir === "R") {
        // Going right: count multiples of 100 in range (pos, pos + dist]
        count += Math.floor((pos + dist) / 100) - Math.floor(pos / 100);
      } else {
        // Going left: we hit 0 at clicks pos, pos+100, pos+200, ...
        if (pos === 0) {
          count += Math.floor(dist / 100);
        } else if (dist >= pos) {
          count += 1 + Math.floor((dist - pos) / 100);
        }
      }

      pos = dir === "L" ? mod(pos - dist, 100) : mod(pos + dist, 100);
    });

  return count;
};

if (import.meta.main) {
  const input = readFileSync("day01/input.txt", "utf-8");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
