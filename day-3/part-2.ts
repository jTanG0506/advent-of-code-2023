import * as fs from "fs";
import path from "path";

const isDigit = (c: string) => {
  return c >= "0" && c <= "9";
};

const isSymbol = (c: string) => {
  return c !== "." && !isDigit(c);
};

const getNeighboringSymbols = (
  x1: number,
  x2: number,
  y: number,
  rows: string[]
) => {
  const pairs: [number, number][] = [];

  for (let row = x1 - 1; row <= x2 + 1; ++row) {
    for (let col = y - 1; col <= y + 1; ++col) {
      if (row < 0 || row >= rows[0].length || col < 0 || col >= rows.length) {
        continue;
      }

      if (isSymbol(rows[col][row])) {
        pairs.push([row, col]);
      }
    }
  }

  return pairs;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-3/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const rows = data.split("\n");

  let ans = 0;
  const partCoordsToGears: { [key: string]: number[] } = {};

  for (let y = 0; y < rows.length; ++y) {
    const row = rows[y];

    let x = 0;
    while (x < row.length) {
      while (!isDigit(row[x]) && x < row.length) {
        x++;
      }

      let thisNum = 0;
      while (isDigit(row[x]) && x < row.length) {
        thisNum = thisNum * 10 + Number(row[x]);
        x++;
      }

      if (thisNum) {
        const length = thisNum.toString().length;
        const pairs = getNeighboringSymbols(x - length, x - 1, y, rows);

        for (let i = 0; i < pairs.length; ++i) {
          const [x, y] = pairs[i];
          const key = `${x},${y}`;

          if (!(key in partCoordsToGears)) {
            partCoordsToGears[key] = [];
          }

          partCoordsToGears[key].push(thisNum);
        }
      }
    }
  }

  for (const [key, value] of Object.entries(partCoordsToGears)) {
    if (value.length === 2) {
      ans += value[0] * value[1];
    }
  }

  console.log(ans);
};

main();
