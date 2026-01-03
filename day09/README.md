# Day 9: Rectangle Area with Polygon Constraints

[Problem](https://adventofcode.com/2025/day/9)

## Part 1: Largest Rectangle with Red Tile Corners

Given a list of red tiles (coordinates), find the largest rectangle where two red tiles form opposite corners.

**Algorithm:**

- Brute force all pairs of red tiles as potential opposite corners
- Calculate the rectangle area for each pair
- Track the maximum area found

**Time Complexity:** O(n²) where n is the number of red tiles

## Part 2: Largest Rectangle Within Polygon

Red tiles form a closed polygon where consecutive tiles are connected by green tiles (either horizontally or vertically). All tiles inside the polygon are also green. Find the largest rectangle with red tile corners where all tiles in the rectangle are either red or green (on the polygon boundary or inside it).

**Algorithm:**

1. Parse red tiles to form a polygon (list wraps around)
2. Build a set of all edge tiles (green tiles connecting consecutive red tiles)
3. For each pair of red tiles as opposite corners:
   - Skip if rectangle area > MAX_AREA_TO_CHECK (performance optimization)
   - Skip if area <= current max (pruning)
   - Check each tile in the rectangle:
     - Valid if it's a red tile, an edge tile, or inside the polygon (using ray casting)
   - Track maximum valid area

**Key Functions:**

- `getTilesOnEdge(p1, p2)`: Returns all tiles on horizontal/vertical line between two points
- `isPointInPolygon(point, polygon)`: Ray casting algorithm to determine if a point is inside a polygon
- `solvePart2()`: Main algorithm with optimizations for large rectangles

**Time Complexity:** O(n² × A) where n is red tiles and A is average rectangle area (capped at 200,000)

**Optimization:** Extremely large rectangles (area > 200,000) are skipped to prevent timeout

## Run

```bash
bun run day09
```

## Answers

- Part 1: 4729332959 ⭐
- Part 2:
