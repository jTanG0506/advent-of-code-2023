import * as fs from "fs";
import path from "path";

const getStart = (lines: string[]) => {
  let ROWS = lines.length - 1;
  let COLS = lines[0].length - 1;

  for (let i = 0; i < ROWS; ++i) {
    for (let j = 0; j < COLS; ++j) {
      if (lines[i][j] === "S") {
        return [i, j] as const;
      }
    }
  }
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-10/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  let ROWS = lines.length - 1;
  let COLS = lines[0].length - 1;

  const visited = new Set<string>();
  let coords: [number, number][] = [];
  const queue: (readonly [number, number])[] = [];
  const start = getStart(lines);

  if (!start) {
    console.log("invalid input");
    return;
  }

  visited.add(`${start[0]},${start[1]}`);
  queue.push(start);
  coords.push([start[0], start[1]]);

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const ch = lines[r][c];

    if (
      r > 0 &&
      "S|JL".includes(ch) &&
      "|7F".includes(lines[r - 1][c]) &&
      !visited.has(`${r - 1},${c}`)
    ) {
      visited.add(`${r - 1},${c}`);
      coords.push([r - 1, c]);
      queue.push([r - 1, c]);
    } else if (
      r < ROWS &&
      "S|7F".includes(ch) &&
      "|JL".includes(lines[r + 1][c]) &&
      !visited.has(`${r + 1},${c}`)
    ) {
      visited.add(`${r + 1},${c}`);
      coords.push([r + 1, c]);
      queue.push([r + 1, c]);
    } else if (
      c > 0 &&
      "S-J7".includes(ch) &&
      "-LF".includes(lines[r][c - 1]) &&
      !visited.has(`${r},${c - 1}`)
    ) {
      visited.add(`${r},${c - 1}`);
      coords.push([r, c - 1]);
      queue.push([r, c - 1]);
    } else if (
      c < COLS &&
      "S-LF".includes(ch) &&
      "-J7".includes(lines[r][c + 1]) &&
      !visited.has(`${r},${c + 1}`)
    ) {
      visited.add(`${r},${c + 1}`);
      coords.push([r, c + 1]);
      queue.push([r, c + 1]);
    }
  }

  // Shoelace formula
  let area = 0;
  const N = coords.length;
  for (let i = 0; i < N; ++i) {
    const current = coords[i];
    const next = coords[(i + 1) % N];
    area += current[0] * next[1] - current[1] * next[0];
  }

  area = Math.abs(area) / 2;

  // Pick's theorem
  // A = i + b / 2 - 1
  // i = A - b / 2 + 1
  const interiorPoints = area - coords.length / 2 + 1;
  console.log(Math.floor(interiorPoints));
};

main();
