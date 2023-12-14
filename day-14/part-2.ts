import * as fs from "fs";
import path from "path";

const ITERATION_COUNT = 1_000_000_000;

const tilt = (lines: string[][]) => {
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
};

const cycle = (lines: string[][]): string[][] => {
  for (let i = 0; i < 4; ++i) {
    tilt(lines);
    lines = lines[0].map((_, colIndex) => lines.map((row) => row[colIndex]));
    lines = lines.map((line) => line.reverse());
  }

  return lines;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-14/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  let lines = data.split("\n").map((line) => line.split(""));

  const initial = JSON.stringify(lines);
  const seen = new Set<string>(initial);
  const arr = [initial];
  let iteration = 0;

  for (let i = 0; i < ITERATION_COUNT; ++i) {
    iteration++;
    lines = cycle(lines);

    const str = JSON.stringify(lines);
    if (seen.has(str)) {
      break;
    }

    seen.add(str);
    arr.push(str);
  }

  let first = arr.findIndex((s) => s === JSON.stringify(lines));
  const finalLines = JSON.parse(
    arr[((ITERATION_COUNT - first) % (iteration - first)) + first]
  ) as string[][];

  let res = 0;
  for (let i = 0; i < finalLines.length; ++i) {
    const weight = finalLines.length - i;

    for (let j = 0; j < finalLines[i].length; ++j) {
      if (finalLines[i][j] === "O") {
        res += weight;
      }
    }
  }

  console.log(res);
};

main();
