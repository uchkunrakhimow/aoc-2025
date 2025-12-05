# Day 5: Cafeteria

[Problem](https://adventofcode.com/2025/day/5)

## Part 1
The Elves need help with their new inventory management system. Given a list of fresh ingredient ID ranges and a list of available ingredient IDs, determine how many of the available IDs are fresh (fall within any range).

For example, with ranges `3-5`, `10-14`, `16-20`, `12-18` and IDs `1`, `5`, `8`, `11`, `17`, `32`:
- ID 1: spoiled (not in any range)
- ID 5: fresh (in range 3-5)
- ID 8: spoiled
- ID 11: fresh (in range 10-14)
- ID 17: fresh (in ranges 12-18 and 16-20)
- ID 32: spoiled

Result: 3 fresh ingredients

## Part 2
Count the total number of unique ingredient IDs that are considered fresh across all ranges. Ranges can overlap, so we need to merge them to avoid double-counting.

Using the same ranges from Part 1, the fresh IDs are: 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 = 14 total IDs.

## Solution Approach

**Part 1:** For each ingredient ID, check if it falls within any range using `.some()`.

**Part 2:** Sort ranges by start position, merge overlapping or adjacent ranges, then sum the count of IDs in each merged range.

## Run
```bash
bun run day05
```

## Answers
- Part 1: 789 ⭐
- Part 2: 343329651880509 ⭐
