# Day 6: Vertical Arithmetic

[Problem](https://adventofcode.com/2025/day/6)

## Problem Summary

Parse and solve ASCII art arithmetic problems that are written vertically in columns.

## Part 1

Read arithmetic problems from left to right. Each problem consists of:
- Numbers written vertically (one digit per row)
- An operator row at the bottom (`+` or `*`)
- Problems separated by blank columns

**Example:**
```
1  2
2  3
+  *
```
This represents two problems:
- Left problem: 1 + 2 = 3
- Right problem: 2 * 3 = 6
- Sum: 9

## Part 2

Read the same arithmetic problems, but parse them from right to left instead. The numbers and operators remain in the same positions, but the reading direction changes the interpretation.

## Solution Approach

**Parsing:**
1. Remove row number prefixes from input lines
2. Extract columns from the grid
3. Group columns into problems (separated by all-space columns)

**Part 1:**
- Reconstruct rows from columns (left-to-right)
- Extract operator from last row
- Parse numbers from remaining rows
- Calculate result based on operator

**Part 2:**
- Reverse column order (right-to-left reading)
- Extract operator and numbers from reversed columns
- Calculate result based on operator

**Time Complexity:** O(n × m) where n is rows and m is columns
**Space Complexity:** O(n × m) for storing column data

## Run
```bash
bun run day06
```

## Answers
- Part 1: 8108520669952
- Part 2: 11708563470209
