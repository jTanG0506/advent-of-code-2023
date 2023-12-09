import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-9/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  let res = 0;
  for (let i = 0; i < lines.length; ++i) {
    let diffs = [lines[i].split(" ").map((item) => parseInt(item))];

    while (!diffs[diffs.length - 1].every((item) => item === 0)) {
      const diff: number[] = [];

      const last = diffs[diffs.length - 1];
      for (let j = 0; j < last.length - 1; ++j) {
        diff.push(last[j + 1] - last[j]);
      }

      diffs.push(diff);
    }

    diffs[diffs.length - 1].unshift(0);

    for (let j = diffs.length - 2; j >= 0; --j) {
      const thisRow = diffs[j];
      const prevRow = diffs[j + 1];
      diffs[j].unshift(thisRow[0] - prevRow[0]);
    }

    res += diffs[0][0];
  }

  console.log(res);
};

main();
