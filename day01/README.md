# Day 1: Secret Entrance

[Problem](https://adventofcode.com/2025/day/1)

## Part 1
Count how many times dial ends at 0 after rotations.

## Part 2
Count how many individual clicks land on 0 (during or after rotations).

**Details:**
- Dial: 0-99 (circular), starts at 50
- L = left (decrease), R = right (increase)
- Part 2 counts each click that lands exactly on 0

## Run
```bash
bun run day01
```

## Test
```bash
bun test day01/index.test.ts
```

## Answers
- Part 1: 1195 ⭐
- Part 2: 6770 ⭐
