import { readFileSync } from "node:fs";

type Point = { x: number; y: number };

const parseInput = (input: string): Point[] => {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [x, y] = line.split(",").map(Number);
      return { x: x!, y: y! };
    });
};

export const solvePart1 = (input: string): number => {
  const redTiles = parseInput(input);
  const n = redTiles.length;

  let maxArea = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const tile1 = redTiles[i]!;
      const tile2 = redTiles[j]!;

      const width = Math.abs(tile2.x - tile1.x) + 1;
      const height = Math.abs(tile2.y - tile1.y) + 1;

      if (width > 1 && height > 1) {
        const area = width * height;
        maxArea = Math.max(maxArea, area);
      }
    }
  }

  return maxArea;
};

// Check if point is on a line segment (including endpoints)
const isOnSegment = (p: Point, a: Point, b: Point): boolean => {
  // Check if point is within bounding box
  const minX = Math.min(a.x, b.x);
  const maxX = Math.max(a.x, b.x);
  const minY = Math.min(a.y, b.y);
  const maxY = Math.max(a.y, b.y);

  if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
    return false;
  }

  // For axis-aligned segments (horizontal or vertical)
  if (a.x === b.x) {
    // Vertical segment
    return p.x === a.x;
  }
  if (a.y === b.y) {
    // Horizontal segment
    return p.y === a.y;
  }

  // For general segments, check collinearity
  const cross = (b.y - a.y) * (p.x - a.x) - (b.x - a.x) * (p.y - a.y);
  return Math.abs(cross) < 0.0001;
};

// Check if a point is inside or on the boundary of a polygon
const isPointInOrOnPolygon = (point: Point, polygon: Point[]): boolean => {
  // First check if point is on the boundary
  for (let i = 0; i < polygon.length; i++) {
    const j = (i + 1) % polygon.length;
    if (isOnSegment(point, polygon[i]!, polygon[j]!)) {
      return true;
    }
  }

  // Then use ray casting to check if inside
  const { x, y } = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i]!.x;
    const yi = polygon[i]!.y;
    const xj = polygon[j]!.x;
    const yj = polygon[j]!.y;

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

// Check if rectangle with corners p1 and p2 is entirely within polygon
const isRectangleInPolygon = (
  p1: Point,
  p2: Point,
  polygon: Point[],
  maxTilesToCheck: number = 10000
): boolean => {
  const minX = Math.min(p1.x, p2.x);
  const maxX = Math.max(p1.x, p2.x);
  const minY = Math.min(p1.y, p2.y);
  const maxY = Math.max(p1.y, p2.y);

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const totalTiles = width * height;

  // For small rectangles, check every tile
  if (totalTiles <= maxTilesToCheck) {
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        if (!isPointInOrOnPolygon({ x, y }, polygon)) {
          return false;
        }
      }
    }
    return true;
  }

  // For very large rectangles, use sampling
  const step = Math.ceil(Math.sqrt(totalTiles / maxTilesToCheck));
  for (let x = minX; x <= maxX; x += step) {
    for (let y = minY; y <= maxY; y += step) {
      if (!isPointInOrOnPolygon({ x, y }, polygon)) {
        return false;
      }
    }
  }

  // Also check the four corners and edges explicitly
  const corners = [
    { x: minX, y: minY },
    { x: maxX, y: maxY },
    { x: minX, y: maxY },
    { x: maxX, y: minY },
  ];

  for (const corner of corners) {
    if (!isPointInOrOnPolygon(corner, polygon)) {
      return false;
    }
  }

  return true;
};

export const solvePart2 = (input: string): number => {
  const redTiles = parseInput(input);
  const n = redTiles.length;

  let maxArea = 0;

  // Try all pairs of red tiles as opposite corners
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const tile1 = redTiles[i]!;
      const tile2 = redTiles[j]!;

      // Check if rectangle is entirely within the polygon
      if (isRectangleInPolygon(tile1, tile2, redTiles)) {
        const width = Math.abs(tile2.x - tile1.x) + 1;
        const height = Math.abs(tile2.y - tile1.y) + 1;

        if (width > 1 && height > 1) {
          const area = width * height;
          maxArea = Math.max(maxArea, area);
        }
      }
    }
  }

  return maxArea;
};

if (import.meta.main) {
  const input = readFileSync("day09/input.txt", "utf-8");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
