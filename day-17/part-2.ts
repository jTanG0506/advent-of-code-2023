import * as fs from "fs";
import path from "path";
import { PriorityQueue } from "./pq";

interface Position {
  heatLoss: number;
  row: number;
  column: number;
  dRow: number;
  dColumn: number;
  steps: number;
}

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const main = () => {
  const filePath = path.join(process.cwd(), "day-17/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const grid = data
    .split("\n")
    .map((line) => line.split("").map((x) => Number(x)));

  const pq = new PriorityQueue<Position>((a, b) => a.heatLoss < b.heatLoss);
  const visited = new Set<string>();

  pq.push({
    heatLoss: 0,
    row: 0,
    column: 0,
    dRow: 1,
    dColumn: 0,
    steps: 0,
  });

  pq.push({
    heatLoss: 0,
    row: 0,
    column: 0,
    dRow: 0,
    dColumn: 1,
    steps: 0,
  });

  const ROWS = grid.length;
  const COLUMNS = grid[0].length;

  while (pq.size() > 0) {
    const { heatLoss, row, column, dRow, dColumn, steps } = pq.pop();

    if (row === ROWS - 1 && column === COLUMNS - 1 && steps >= 4) {
      console.log(heatLoss);
      break;
    }

    const key = `${row},${column},${dRow},${dColumn},${steps}`;
    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    for (let i = 0; i < directions.length; ++i) {
      const [ndr, ndc] = directions[i];

      if (ndr === -dRow && ndc === -dColumn) {
        continue;
      }

      const sameDirection = ndr === dRow && ndc === dColumn;
      if (sameDirection && steps >= 10) {
        continue;
      }

      if (!sameDirection && steps < 4) {
        continue;
      }

      const nextRow = row + ndr;
      const nextColumn = column + ndc;
      if (
        nextRow < 0 ||
        nextRow >= ROWS ||
        nextColumn < 0 ||
        nextColumn >= COLUMNS
      ) {
        continue;
      }

      pq.push({
        heatLoss: heatLoss + grid[nextRow][nextColumn],
        row: nextRow,
        column: nextColumn,
        dRow: ndr,
        dColumn: ndc,
        steps: sameDirection ? steps + 1 : 1,
      });
    }
  }
};

main();
