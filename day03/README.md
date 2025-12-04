# Day 3: Lobby

[Problem](https://adventofcode.com/2025/day/3)

## Problem Summary

Power an escalator by maximizing joltage output from battery banks. Each bank contains batteries labeled with digits 1-9.

**Input Format:** Each line represents a battery bank with digit sequences.

**Example:**
```
987654321111111
811111111111119
234234234234278
818181911112111
```

### Part 1

Select exactly 2 batteries from each bank to maximize the joltage (two-digit number formed by selected digits in order).

**Examples:**
- `987654321111111` → select positions 0,1 → `98`
- `811111111111119` → select positions 0,15 → `89`
- `234234234234278` → select positions 13,14 → `78`
- `818181911112111` → select positions 6,7 → `92`

**Example sum:** 98 + 89 + 78 + 92 = 357

### Part 2

Select exactly 12 batteries from each bank to maximize the joltage (twelve-digit number formed by selected digits in order).

**Examples:**
- `987654321111111` → skip last 3 ones → `987654321111`
- `811111111111119` → skip middle ones → `811111111119`
- `234234234234278` → skip 2,3,2 at start → `434234234278`
- `818181911112111` → skip ones at front → `888911112111`

**Example sum:** 987654321111 + 811111111119 + 434234234278 + 888911112111 = 3121910778619

## Algorithm Explanation

### Part 1: Brute Force Pair Selection

Try all possible pairs of positions (i, j) where i < j:
- Form two-digit number from digits at positions i and j
- Track maximum for each bank

```typescript
for (let i = 0; i < line.length; i++) {
  for (let j = i + 1; j < line.length; j++) {
    max = Math.max(max, parseInt(line[i] + line[j]));
  }
}
```

**Time Complexity:** O(n × m²) where n = lines, m = line length

**Space Complexity:** O(1)

### Part 2: Greedy Selection

Maximize 12-digit number by greedily selecting largest available digit at each position:
- For position i, search from current index to (length - remaining digits needed)
- Select largest digit in valid range
- Continue from next position after selected digit

```typescript
for (let i = 0; i < 12; i++) {
  const end = line.length - (11 - i);
  let maxDigit = "0";
  let maxPos = start;

  for (let j = start; j < end; j++) {
    if (line[j] > maxDigit) {
      maxDigit = line[j];
      maxPos = j;
    }
  }

  result.push(maxDigit);
  start = maxPos + 1;
}
```

**Greedy correctness:** At each position, selecting the largest available digit maximizes the value of that position, which maximizes the overall number (leftmost digits have highest significance).

**Time Complexity:** O(n × m × k) where n = lines, m = line length, k = batteries to select (12)

**Space Complexity:** O(k) for result array

## Run
```bash
bun run day03
```

## Answers
- Part 1: 17142 ⭐
- Part 2: 169935154100102 ⭐
