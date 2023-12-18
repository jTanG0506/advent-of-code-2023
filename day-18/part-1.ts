import * as fs from "fs";
import path from "path";

const dir: { [key: string]: [number, number] } = {
  U: [0, -1],
  D: [0, 1],
  R: [1, 0],
  L: [-1, 0],
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-18/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  let current: [number, number] = [0, 0];
  let currentSteps = 0;
  const coords: [number, number][] = [current];
  for (let i = 0; i < lines.length; ++i) {
    const v = lines[i].split(" ");
    const [dx, dy] = dir[v[0]];
    const steps = parseInt(v[1]);

    current = [current[0] + dx * steps, current[1] + dy * steps];
    currentSteps += steps;
    coords.push(current);
  }

  let area = 0;
  const N = coords.length;
  for (let i = 0; i < N; ++i) {
    const [x1, y1] = coords[i];
    const [x2, y2] = coords[(i + 1) % N];

    area += x1 * y2 - x2 * y1;
  }

  area = Math.abs(area) / 2;
  const interiorPoints = area - currentSteps / 2 + 1;

  const res = currentSteps + interiorPoints;
  console.log(res);
};

main();
