import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { solvePart1, solvePart2 } from "./index.ts";

const sample = readFileSync("day01/sample.txt", "utf-8");

test("Part 1 - sample input", () => {
  expect(solvePart1(sample)).toBe(3);
});

test("Part 2 - sample input", () => {
  expect(solvePart2(sample)).toBe(6);
});
