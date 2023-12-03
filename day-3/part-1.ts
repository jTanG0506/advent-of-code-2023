import * as fs from "fs";
import path from "path";

const isDigit = (c: string) => {
  return c >= "0" && c <= "9";
};

const isSymbol = (c: string) => {
  return c !== "." && !isDigit(c);
};

const hasNeighboringSymbol = (x: number, y: number, rows: string[]) => {
  for (let i = x - 1; i <= x + 1; ++i) {
    for (let j = y - 1; j <= y + 1; ++j) {
      if (i === x && j === y) {
        continue;
      }

      if (i < 0 || i >= rows.length || j < 0 || j >= rows[0].length) {
        continue;
      }

      if (isSymbol(rows[i][j])) {
        return true;
      }
    }
  }

  return false;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-3/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const rows = data.split("\n");

  let ans = 0;

  for (let i = 0; i < rows.length; ++i) {
    const row = rows[i];

    let j = 0;
    while (j < row.length) {
      while (!isDigit(row[j]) && j < row.length) {
        j++;
      }

      let thisNum = 0;
      let isPartNumber = false;
      while (isDigit(row[j]) && j < row.length) {
        thisNum = thisNum * 10 + Number(row[j]);

        if (!isPartNumber) {
          isPartNumber = hasNeighboringSymbol(i, j, rows);
        }

        j++;
      }

      if (thisNum && isPartNumber) {
        ans += thisNum;
      }
    }
  }

  console.log(ans);
};

main();
