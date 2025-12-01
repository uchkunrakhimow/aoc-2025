import { readFileSync } from "node:fs";

export const read = (day: number): string =>
  readFileSync(`day${day.toString().padStart(2, "0")}/input.txt`, "utf-8");
