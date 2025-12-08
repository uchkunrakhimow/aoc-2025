# Day 8: Playground

[Problem](https://adventofcode.com/2025/day/8)

## Problem Summary

Connect electrical junction boxes suspended in a giant underground playground to create circuits. Junction boxes are positioned in 3D space (X, Y, Z coordinates), and when connected, they can share electricity and form circuits.

**Key Concepts:**
- Junction boxes start in individual circuits (1 per box)
- Connecting two boxes merges their circuits
- We prioritize connecting the closest pairs (by Euclidean distance)
- Some connection attempts may fail if boxes are already in the same circuit

## Part 1: Connect the 1000 Closest Pairs

Attempt to connect the 1000 closest pairs of junction boxes. After making these 1000 connection attempts, find the sizes of the three largest circuits and multiply them together.

**Example Process:**
```
Start: 20 boxes in 20 separate circuits
Connect boxes at 162,817,812 and 425,690,689 → 1 circuit with 2 boxes, 18 with 1
Connect boxes at 162,817,812 and 431,825,988 → 1 circuit with 3 boxes, 17 with 1
Connect boxes at 906,360,560 and 805,96,715 → 1 circuit with 3, 1 with 2, 15 with 1
Try to connect 431,825,988 and 425,690,689 → Already connected! (no change)
...
After 10 attempts: 5+4+2 = 40
```

**Note:** Not all 1000 attempts will succeed - some pairs may already be in the same circuit.

## Part 2: Complete the Network

Continue connecting the closest pairs until all junction boxes form a single unified circuit. Find the last pair that completes this connection and multiply their X coordinates together.

**Key Insight:**
- With N junction boxes, we need exactly N-1 successful connections to form one circuit
- The "last connection" is the final successful union that reduces circuit count to 1

## Algorithm Explanation

### Data Structure: Union-Find (Disjoint Set Union)

The solution uses Union-Find with two optimizations:

**1. Path Compression:** When finding the root, compress the path by pointing all nodes directly to the root
```typescript
const find = (x: number): number => {
  if (parent[x] !== x) {
    parent[x] = find(parent[x]!);  // Path compression
  }
  return parent[x]!;
};
```

**2. Union by Rank:** Attach smaller trees under larger trees to keep height low
```typescript
const union = (x: number, y: number): boolean => {
  const rootX = find(x);
  const rootY = find(y);

  if (rootX === rootY) return false;  // Already connected

  // Attach smaller rank tree under root of higher rank tree
  if (rank[rootX]! < rank[rootY]!) {
    parent[rootX] = rootY;
    circuitSize[rootY] += circuitSize[rootX]!;
  } else {
    parent[rootY] = rootX;
    circuitSize[rootX] += circuitSize[rootY]!;
    if (rank[rootX] === rank[rootY]) rank[rootX]++;
  }

  return true;
};
```

### Part 1: Find Three Largest Circuits

```typescript
1. Parse all junction box coordinates (X, Y, Z)
2. Calculate all pairwise distances: √((x₁-x₂)² + (y₁-y₂)² + (z₁-z₂)²)
3. Sort all edges by distance (ascending)
4. Initialize Union-Find structure
5. Attempt to connect the 1000 closest pairs
6. Get circuit sizes and sort descending
7. Return product of three largest: size[0] × size[1] × size[2]
```

**Time Complexity:**
- Calculating distances: O(n²)
- Sorting edges: O(n² log n) where n = number of boxes
- Union-Find operations: O(k × α(n)) ≈ O(k) where k = 1000, α is inverse Ackermann (effectively constant)
- Overall: O(n² log n)

**Space Complexity:** O(n²) for storing all edges

### Part 2: Complete the Network

```typescript
1. Parse coordinates and calculate all pairwise distances (same as Part 1)
2. Sort edges by distance
3. Initialize Union-Find with circuitCount = n
4. Connect pairs in order, tracking successful connections
5. When circuitCount reaches 1, stop
6. Return x₁ × x₂ of the last connected pair
```

**Key Difference:** Continue until all boxes are in one circuit (n-1 successful connections for n boxes)

**Time Complexity:** O(n² log n) - same as Part 1, may process more edges

**Space Complexity:** O(n²) for edges

## Implementation Details

**Functional Approach (No Classes):**
- `parseInput()`: Parse coordinates from comma-separated format
- `calculateDistance()`: Euclidean distance in 3D space
- `createUnionFind()`: Returns object with find, union, and getCircuitSizes methods
- `solvePart1()`: Connect 1000 closest pairs, multiply three largest circuits
- `solvePart2()`: Connect until one circuit, multiply X coordinates

**Distance Formula:**
```
distance = √((x₁-x₂)² + (y₁-y₂)² + (z₁-z₂)²)
```

## Run
```bash
bun run day08
```

## Answers
- Part 1: 67488 ⭐
- Part 2: 3767453340 ⭐
