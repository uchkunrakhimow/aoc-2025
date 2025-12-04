# Day 4: Printing Department

[Problem](https://adventofcode.com/2025/day/4)

## Problem Summary

Optimize forklift work by identifying accessible rolls of paper on a grid. Rolls are accessible if they have fewer than 4 adjacent rolls.

**Input Format:** Grid where `@` represents paper rolls and `.` represents empty space.

**Example:**
```
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
```

### Part 1

Count how many rolls can be accessed by forklifts (rolls with fewer than 4 adjacent rolls in 8 directions).

**Example:** In the grid above, 13 rolls are accessible (marked with x):
```
..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.
```

**Example answer:** 13

### Part 2

Simulate iterative removal of accessible rolls. After removing accessible rolls, new rolls may become accessible. Count total rolls removed.

**Process:**
1. Find all rolls with < 4 adjacent rolls
2. Remove them all
3. Repeat until no more rolls can be removed
4. Return total count of removed rolls

**Example steps:**
- Initial: 13 accessible → remove 13
- Round 2: 12 accessible → remove 12
- Round 3: 7 accessible → remove 7
- Round 4: 5 accessible → remove 5
- Round 5: 2 accessible → remove 2
- Round 6: 1 accessible → remove 1
- Round 7: 1 accessible → remove 1
- Round 8: 1 accessible → remove 1
- Round 9: 1 accessible → remove 1
- **Total: 43 rolls removed**

## Algorithm Explanation

### Part 1: Grid Traversal with Adjacency Check

For each `@` cell, count adjacent `@` cells in 8 directions:
```
[-1,-1] [-1, 0] [-1, 1]
[ 0,-1]    @    [ 0, 1]
[ 1,-1] [ 1, 0] [ 1, 1]
```

Count cells where adjacent count < 4.

```typescript
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    if (grid[row][col] === "@") {
      let adjacent = countAdjacent(row, col);
      if (adjacent < 4) accessible++;
    }
  }
}
```

**Time Complexity:** O(n × m) where n = rows, m = cols

**Space Complexity:** O(1)

### Part 2: Iterative Simulation

Repeat until no more accessible rolls:
1. Scan entire grid for accessible rolls (< 4 adjacent)
2. Collect all accessible positions
3. Remove all accessible rolls simultaneously
4. Add removed count to total

```typescript
while (true) {
  const toRemove = findAccessibleRolls();
  if (toRemove.length === 0) break;

  removeRolls(toRemove);
  totalRemoved += toRemove.length;
}
```

**Key insight:** Remove all accessible rolls in each iteration simultaneously, not one at a time. This prevents cascading effects within a single round.

**Time Complexity:** O(k × n × m) where k = number of iterations (typically small)

**Space Complexity:** O(n × m) for mutable grid

## Run
```bash
bun run day04
```

## Answers
- Part 1: 1393 ⭐
- Part 2: 8643 ⭐
