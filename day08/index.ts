import { read } from "../utils/read.ts";

type Point3D = { x: number; y: number; z: number };

const parseInput = (input: string): Point3D[] => {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [x, y, z] = line.split(",").map(Number);
      return { x: x!, y: y!, z: z! };
    });
};

const calculateDistance = (p1: Point3D, p2: Point3D): number => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = p1.z - p2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const createUnionFind = (size: number) => {
  const parent = Array.from({ length: size }, (_, i) => i);
  const rank = Array(size).fill(0);
  const circuitSize = Array(size).fill(1);

  const find = (x: number): number => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]!);
    }
    return parent[x]!;
  };

  const union = (x: number, y: number): boolean => {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) {
      return false;
    }

    if (rank[rootX]! < rank[rootY]!) {
      parent[rootX] = rootY;
      circuitSize[rootY] += circuitSize[rootX]!;
    } else if (rank[rootX]! > rank[rootY]!) {
      parent[rootY] = rootX;
      circuitSize[rootX] += circuitSize[rootY]!;
    } else {
      parent[rootY] = rootX;
      circuitSize[rootX] += circuitSize[rootY]!;
      rank[rootX]++;
    }

    return true;
  };

  const getCircuitSizes = (): number[] => {
    const sizes = new Map<number, number>();
    for (let i = 0; i < size; i++) {
      const root = find(i);
      sizes.set(root, circuitSize[root]!);
    }
    return Array.from(sizes.values());
  };

  return { find, union, getCircuitSizes };
};

export const solvePart1 = (input: string): number => {
  const junctionBoxes = parseInput(input);
  const n = junctionBoxes.length;

  const edges: { i: number; j: number; distance: number }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const distance = calculateDistance(junctionBoxes[i]!, junctionBoxes[j]!);
      edges.push({ i, j, distance });
    }
  }

  edges.sort((a, b) => a.distance - b.distance);

  const uf = createUnionFind(n);

  let attemptsCount = 0;
  for (const edge of edges) {
    uf.union(edge.i, edge.j);
    attemptsCount++;
    if (attemptsCount === 1000) {
      break;
    }
  }

  const circuitSizes = uf.getCircuitSizes();
  circuitSizes.sort((a, b) => b - a);

  return (circuitSizes[0] ?? 0) * (circuitSizes[1] ?? 0) * (circuitSizes[2] ?? 0);
};

export const solvePart2 = (input: string): number => {
  const junctionBoxes = parseInput(input);
  const n = junctionBoxes.length;

  const edges: { i: number; j: number; distance: number }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const distance = calculateDistance(junctionBoxes[i]!, junctionBoxes[j]!);
      edges.push({ i, j, distance });
    }
  }

  edges.sort((a, b) => a.distance - b.distance);

  const uf = createUnionFind(n);

  let lastConnectionIndices = { i: -1, j: -1 };
  let circuitCount = n;

  for (const edge of edges) {
    if (uf.union(edge.i, edge.j)) {
      circuitCount--;
      lastConnectionIndices = { i: edge.i, j: edge.j };

      if (circuitCount === 1) {
        break;
      }
    }
  }

  const x1 = junctionBoxes[lastConnectionIndices.i]?.x ?? 0;
  const x2 = junctionBoxes[lastConnectionIndices.j]?.x ?? 0;

  return x1 * x2;
};

if (import.meta.main) {
  const input = read(8);
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
