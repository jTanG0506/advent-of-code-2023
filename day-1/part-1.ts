import * as fs from "fs";
import path from "path";

const isDigit = (c: string) => {
  return c >= "0" && c <= "9";
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-1/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  let ans = 0;
  for (let i = 0; i < lines.length; ++i) {
    let left = 0,
      right = 0;
    for (let j = 0; j < lines[i].length; ++j) {
      if (isDigit(lines[i][j])) {
        left = Number(lines[i][j]);
        break;
      }
    }

    for (let j = lines[i].length - 1; j >= 0; --j) {
      if (isDigit(lines[i][j])) {
        right = Number(lines[i][j]);
        break;
      }
    }

    const v = 10 * left + right;
    ans += v;
  }

  console.log(ans);
};

main();
