import * as fs from "fs";
import path from "path";

const SPACE_MULTIPLIER = 1000000;

const galaxyDistance = (
  a: [number, number],
  b: [number, number],
  rowsWithoutStar: number[],
  colsWithoutStar: number[]
) => {
  const x1 = Math.min(a[1], b[1]);
  const x2 = Math.max(a[1], b[1]);
  const y1 = Math.min(a[0], b[0]);
  const y2 = Math.max(a[0], b[0]);

  const emptyCols = colsWithoutStar.filter((n) => x1 < n && n < x2).length;
  const emptyRows = rowsWithoutStar.filter((n) => y1 < n && n < y2).length;

  const manhattanX = Math.abs(x1 - x2);
  const manhattanY = Math.abs(y1 - y2);

  const x = manhattanX + emptyCols * (SPACE_MULTIPLIER - 1);
  const y = manhattanY + emptyRows * (SPACE_MULTIPLIER - 1);

  return x + y;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-11/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const STAR = "#";

  let rowsWithoutStar: number[] = [];
  let colsWithoutStar: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const row = lines[i];
    let hasStar = false;
    for (let j = 0; j < row.length; j++) {
      if (row[j] === STAR) {
        hasStar = true;
        break;
      }
    }

    if (!hasStar) {
      rowsWithoutStar.push(i);
    }
  }

  for (let i = 0; i < lines[0].length; i++) {
    let hasStar = false;
    for (let j = 0; j < lines.length; j++) {
      if (lines[j][i] === STAR) {
        hasStar = true;
        break;
      }
    }

    if (!hasStar) {
      colsWithoutStar.push(i);
    }
  }

  const stars: [number, number][] = [];
  for (let i = 0; i < lines.length; ++i) {
    for (let j = 0; j < lines[i].length; ++j) {
      if (lines[i][j] === STAR) {
        stars.push([i, j]);
      }
    }
  }

  let res = 0;
  for (let i = 0; i < stars.length; ++i) {
    for (let j = i + 1; j < stars.length; ++j) {
      res += galaxyDistance(
        stars[i],
        stars[j],
        rowsWithoutStar,
        colsWithoutStar
      );
    }
  }

  console.log(res);
};

main();
