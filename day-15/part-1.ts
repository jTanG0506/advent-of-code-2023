import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-15/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");
  const sequence = lines[0].split(",");

  let res = 0;

  for (let i = 0; i < sequence.length; ++i) {
    let current = 0;
    for (let j = 0; j < sequence[i].length; ++j) {
      const v = sequence[i][j].charCodeAt(0);
      current += v;
      current *= 17;
      current = current % 256;
    }
    res += current;
  }

  console.log(res);
};

main();
