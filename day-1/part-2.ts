import * as fs from "fs";
import path from "path";

const wordToDigit = (word: string): number => {
  const digits: { [word: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  return digits[word] || 0;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-1/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

  let ans = 0;
  for (let i = 0; i < lines.length; ++i) {
    const matches = Array.from(lines[i].matchAll(regex));

    if (matches && matches.length) {
      const l = matches[0][1];
      const r = matches[matches.length - 1][1];

      const left = parseInt(l) || wordToDigit(l) || 0;
      const right = parseInt(r) || wordToDigit(r) || 0;

      const v = 10 * left + right;
      ans += v;
    }
  }

  console.log(ans);
};

main();
