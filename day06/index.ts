import { read } from "../utils/read.ts";

export const solvePart1 = (input: string): number => {
  const lines = input.trim().split("\n");

  const rows = lines.map(line => {
    const arrowIndex = line.indexOf("→");
    return arrowIndex >= 0 ? line.substring(arrowIndex + 1) : line;
  });

  const width = Math.max(...rows.map(r => r.length));

  const paddedRows = rows.map(row => row.padEnd(width, " "));

  const columns: string[] = [];
  for (let col = 0; col < width; col++) {
    let column = "";
    for (let row = 0; row < paddedRows.length; row++) {
      column += paddedRows[row]![col];
    }
    columns.push(column);
  }

  const problems: string[][] = [];
  let currentProblem: string[] = [];

  for (const column of columns) {
    const isAllSpaces = column.split("").every(c => c === " ");

    if (isAllSpaces) {
      if (currentProblem.length > 0) {
        problems.push([...currentProblem]);
        currentProblem = [];
      }
    } else {
      currentProblem.push(column);
    }
  }

  if (currentProblem.length > 0) {
    problems.push(currentProblem);
  }

  let grandTotal = 0;

  for (const problem of problems) {
    const numRows = problem[0]!.length;
    const problemRows: string[] = [];

    for (let row = 0; row < numRows; row++) {
      let rowStr = "";
      for (const col of problem) {
        rowStr += col[row];
      }
      problemRows.push(rowStr.trim());
    }

    const operator = problemRows[numRows - 1]!;

    const numbers: number[] = [];
    for (let i = 0; i < numRows - 1; i++) {
      const num = parseInt(problemRows[i]!, 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }

    if (numbers.length > 0) {
      let result = numbers[0]!;
      for (let i = 1; i < numbers.length; i++) {
        if (operator === "*") {
          result *= numbers[i]!;
        } else if (operator === "+") {
          result += numbers[i]!;
        }
      }
      grandTotal += result;
    }
  }

  return grandTotal;
};

export const solvePart2 = (input: string): number => {
  const lines = input.trim().split("\n");

  const rows = lines.map(line => {
    const arrowIndex = line.indexOf("→");
    return arrowIndex >= 0 ? line.substring(arrowIndex + 1) : line;
  });

  const width = Math.max(...rows.map(r => r.length));

  const paddedRows = rows.map(row => row.padEnd(width, " "));

  const columns: string[] = [];
  for (let col = 0; col < width; col++) {
    let column = "";
    for (let row = 0; row < paddedRows.length; row++) {
      column += paddedRows[row]![col];
    }
    columns.push(column);
  }

  const problems: string[][] = [];
  let currentProblem: string[] = [];

  for (const column of columns) {
    const isAllSpaces = column.split("").every(c => c === " ");

    if (isAllSpaces) {
      if (currentProblem.length > 0) {
        problems.push([...currentProblem]);
        currentProblem = [];
      }
    } else {
      currentProblem.push(column);
    }
  }

  if (currentProblem.length > 0) {
    problems.push(currentProblem);
  }

  let grandTotal = 0;

  for (const problem of problems) {
    const reversedProblem = [...problem].reverse();

    const numbers: number[] = [];
    let operator = "";

    for (const column of reversedProblem) {
      const lastChar = column[column.length - 1]!;

      if (lastChar === "*" || lastChar === "+") {
        operator = lastChar;
      }

      const numStr = column.substring(0, column.length - 1).trim();
      if (numStr.length > 0) {
        const num = parseInt(numStr, 10);
        if (!isNaN(num)) {
          numbers.push(num);
        }
      }
    }

    if (numbers.length > 0) {
      let result = numbers[0]!;
      for (let i = 1; i < numbers.length; i++) {
        if (operator === "*") {
          result *= numbers[i]!;
        } else if (operator === "+") {
          result += numbers[i]!;
        }
      }
      grandTotal += result;
    }
  }

  return grandTotal;
};

if (import.meta.main) {
  const input = read(6);
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
