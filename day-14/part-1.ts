import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-14/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n").map((line) => line.split(""));

  let height = lines.length;
  let width = lines[0].length;

  for (let x = 0; x < width; ++x) {
    let freeSpace: number | null = null;
    for (let y = 0; y < height; ++y) {
      if (lines[y][x] === "O" && freeSpace !== null) {
        lines[freeSpace][x] = "O";
        lines[y][x] = ".";
        freeSpace++;
      } else if (lines[y][x] === ".") {
        freeSpace = freeSpace === null ? y : freeSpace;
      } else if (lines[y][x] === "#") {
        freeSpace = null;
      }
    }
  }

  let res = 0;
  for (let i = 0; i < height; ++i) {
    const weight = height - i;

    for (let j = 0; j < width; ++j) {
      if (lines[i][j] === "O") {
        res += weight;
      }
    }
  }

  console.log(res);
};

main();
