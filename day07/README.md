# Day 7: Laboratories

[Problem](https://adventofcode.com/2025/day/7)

## Problem Summary

Fix a broken teleporter by analyzing how tachyon beams behave in a tachyon manifold. The manifold contains splitters that split beams into multiple paths.

**Manifold Properties:**
- Tachyon beams start at position `S` and always move downward
- Beams pass freely through empty space (`.`)
- When a beam encounters a splitter (`^`), the beam stops and two new beams continue from the immediate left and right of the splitter

### Part 1: Classical Tachyon Manifold

Count how many times tachyon beams are split as they travel through the manifold.

**Example:**
```
.......S.......
...............
.......^.......
...............
......^.^......
```

Process:
1. Beam starts at S and moves downward
2. Hits first splitter at row 2, col 7 → **Split 1**
3. Two new beams continue from (2,6) and (2,8)
4. Both hit splitters at row 4 → **Split 2 and 3**
5. Continue until all beams exit

**Answer:** Count of unique splitters activated

### Part 2: Quantum Tachyon Manifold

With quantum mechanics, a single particle takes BOTH paths at each splitter simultaneously, creating parallel timelines. Count the total number of distinct timelines after the particle completes all possible journeys.

**Key Insight:** Each splitter doubles the number of possible paths, but paths can converge. Need to count all unique complete paths through the manifold.

**Example timelines:**
- Timeline where particle always went left
- Timeline where particle alternated left/right
- Timeline where particle took different paths but ended at same position

The number of timelines grows exponentially with the number of splitters encountered.

## Algorithm Explanation

### Part 1: Beam Simulation with Set Tracking

Simulate beams moving through the manifold step by step:

```typescript
let currentBeams = new Set<string>();
currentBeams.add(`${startRow},${startCol}`);

while (currentBeams.size > 0) {
  const nextBeams = new Set<string>();

  for (const beam of currentBeams) {
    if (hits_splitter && !activated) {
      splitCount++;
      activatedSplitters.add(splitter);
      nextBeams.add(left_position);
      nextBeams.add(right_position);
    } else {
      nextBeams.add(next_position);
    }
  }

  currentBeams = nextBeams;
}
```

**Key Points:**
- Track which splitters have been activated (avoid double-counting)
- Use Set to deduplicate beam positions at each step
- Process all beams in parallel, one row at a time

**Time Complexity:** O(h × w) where h = height, w = width (bounded by grid size)

**Space Complexity:** O(w) for tracking active beams (at most O(2^d) beams where d = depth, but limited by width)

### Part 2: Recursive Path Counting with Memoization

Count all possible paths from any position to the exit using dynamic programming:

```typescript
const countPaths = (row: number, col: number): number => {
  // Base cases
  if (col < 0 || col >= width) return 0;  // Out of bounds
  if (row >= height) return 1;             // Exited successfully

  // Check memo
  if (memo.has(key)) return memo.get(key);

  // Recursive case
  if (next_cell_is_splitter) {
    result = countPaths(row+1, col-1) + countPaths(row+1, col+1);
  } else {
    result = countPaths(row+1, col);
  }

  memo.set(key, result);
  return result;
};
```

**Key Insights:**
- Each splitter creates two branches: paths = left_paths + right_paths
- Memoization is critical to avoid recalculating the same positions
- Bottom-up: a position's path count = sum of paths from next positions
- Result can be extremely large (exponential growth)

**Time Complexity:** O(h × w) with memoization (each position calculated once)

**Space Complexity:** O(h × w) for memoization cache

## Run
```bash
bun run day07
```

## Answers
- Part 1: 1573 ⭐
- Part 2: 15093663987272 ⭐
