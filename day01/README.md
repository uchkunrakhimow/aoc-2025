# Day 1: Secret Entrance

[Problem](https://adventofcode.com/2025/day/1)

## Problem Summary

You need to find the password to enter the North Pole base by analyzing a safe dial mechanism.

**Dial Properties:**
- Numbers: 0-99 (circular/wrapping)
- Starting position: 50
- Directions: L (left/decrease), R (right/increase)
- Input format: Direction + Distance (e.g., `R48`, `L30`)

### Part 1
Count how many times the dial ends at position 0 after completing each rotation.

**Example:** Following rotations `L68, L30, R48, L5, R60, L55, L1, L99, R14, L82`
- After rotation 3 (R48): dial at 0
- After rotation 6 (L55): dial at 0
- After rotation 8 (L99): dial at 0
- **Answer: 3**

### Part 2
Count every individual click that lands on 0, including clicks during rotations (not just at the end).

**Example:** Same rotations as Part 1
- Rotation 1 (L68): crosses 0 once during movement
- Rotation 3 (R48): ends at 0 (counted in Part 1)
- Rotation 5 (R60): crosses 0 once during movement
- Rotation 6 (L55): ends at 0 (counted in Part 1)
- Rotation 8 (L99): ends at 0 (counted in Part 1)
- Rotation 10 (L82): crosses 0 once during movement
- **Answer: 6** (3 from Part 1 + 3 additional crossings)

## Algorithm Explanation

### Part 1: Simple Position Tracking

```typescript
position = (position ± distance) mod 100
```

Uses modular arithmetic to handle circular wrapping. The custom `mod` function ensures negative numbers wrap correctly:
```typescript
mod(n, m) = ((n % m) + m) % m
```

**Time Complexity:** O(n) where n is number of rotations
**Space Complexity:** O(1)

### Part 2: Mathematical Click Counting

Instead of simulating each click, we calculate how many times 0 is crossed mathematically:

**Right rotation (increasing):**
```typescript
clicks = floor((pos + dist) / 100) - floor(pos / 100)
```
Counts how many multiples of 100 we pass through.

**Left rotation (decreasing):**
- If starting at 0: `clicks = floor(dist / 100)` (every 100 clicks returns to 0)
- If starting elsewhere and dist ≥ pos: `clicks = 1 + floor((dist - pos) / 100)`
  - First click: reach 0 after `pos` clicks
  - Additional clicks: every 100 clicks thereafter

**Example:** Position 82, rotate L30
- Need 82 clicks to first reach 0
- Only moving 30 clicks total
- Result: 0 crossings

**Example:** Position 50, rotate R150
- From 50 to 150 (wraps to 50)
- Crosses 100 once (position 0)
- Result: 1 crossing

**Time Complexity:** O(n) where n is number of rotations

**Space Complexity:** O(1)

## Answers

- Part 1: 1195 ⭐
- Part 2: 6770 ⭐
