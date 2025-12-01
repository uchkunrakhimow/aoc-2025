#!/usr/bin/env bun
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dayNumber = process.argv[2];

if (!dayNumber) {
  console.error("Usage: bun run new-day <day-number>");
  console.error("Example: bun run new-day 2");
  process.exit(1);
}

const day = parseInt(dayNumber);
if (isNaN(day) || day < 1 || day > 25) {
  console.error("Day number must be between 1 and 25");
  process.exit(1);
}

const dayFolder = `day${day.toString().padStart(2, "0")}`;
const dayPath = join(process.cwd(), dayFolder);

// Check if day already exists
if (existsSync(dayPath)) {
  console.error(`${dayFolder} already exists!`);
  process.exit(1);
}

// Create day folder
mkdirSync(dayPath, { recursive: true });
console.log(`✓ Created ${dayFolder}/`);

// Create index.ts
const indexTemplate = `import { read } from "../utils/read.ts";

export const solvePart1 = (input: string): number => {
  // TODO: Implement Part 1
  return 0;
};

export const solvePart2 = (input: string): number => {
  // TODO: Implement Part 2
  return 0;
};

if (import.meta.main) {
  const input = read(${day});
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
`;
writeFileSync(join(dayPath, "index.ts"), indexTemplate);
console.log(`✓ Created ${dayFolder}/index.ts`);

// Create index.test.ts
const testTemplate = `import { test, expect, describe } from "bun:test";
import { readFileSync } from "node:fs";
import { solvePart1, solvePart2 } from "./index.ts";

const sample = readFileSync("${dayFolder}/sample.txt", "utf-8");

describe("Part 1", () => {
  test("sample input", () => {
    expect(solvePart1(sample)).toBe(0); // TODO: Update expected value
  });
});

describe("Part 2", () => {
  test("sample input", () => {
    expect(solvePart2(sample)).toBe(0); // TODO: Update expected value
  });
});
`;
writeFileSync(join(dayPath, "index.test.ts"), testTemplate);
console.log(`✓ Created ${dayFolder}/index.test.ts`);

// Create empty input files
writeFileSync(join(dayPath, "input.txt"), "");
console.log(`✓ Created ${dayFolder}/input.txt`);

writeFileSync(join(dayPath, "sample.txt"), "");
console.log(`✓ Created ${dayFolder}/sample.txt`);

// Create README.md
const readmeTemplate = `# Day ${day}: [Title]

[Problem](https://adventofcode.com/2025/day/${day})

## Problem Summary

TODO: Add problem description

**Key Points:**
- TODO: Add key points

### Part 1
TODO: Describe Part 1

### Part 2
TODO: Describe Part 2

## Algorithm Explanation

### Part 1

TODO: Explain algorithm

**Time Complexity:** O(?)
**Space Complexity:** O(?)

### Part 2

TODO: Explain algorithm

**Time Complexity:** O(?)
**Space Complexity:** O(?)

## Run

\`\`\`bash
bun run ${dayFolder}
\`\`\`

## Test

\`\`\`bash
bun test ${dayFolder}/index.test.ts
\`\`\`

## Answers

- Part 1: ? ⭐
- Part 2: ? ⭐

## Key Insights

1. TODO: Add insights
`;
writeFileSync(join(dayPath, "README.md"), readmeTemplate);
console.log(`✓ Created ${dayFolder}/README.md`);

// Update package.json
const packageJsonPath = join(process.cwd(), "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

packageJson.scripts[dayFolder] = `bun ${dayFolder}/index.ts`;

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
console.log(`✓ Updated package.json with '${dayFolder}' script`);

console.log(`\n🎄 Day ${day} setup complete!`);
console.log(`\nNext steps:`);
console.log(`1. Paste puzzle input into ${dayFolder}/input.txt`);
console.log(`2. Paste sample input into ${dayFolder}/sample.txt`);
console.log(`3. Update ${dayFolder}/README.md with problem details`);
console.log(`4. Implement solution in ${dayFolder}/index.ts`);
console.log(`5. Run: bun run ${dayFolder}`);
console.log(`6. Test: bun test ${dayFolder}/index.test.ts`);
