import * as fs from "fs";
import path from "path";

const COL_MULTIPLIER = 1;
const ROW_MULTIPLIER = 100;

const hammingDistance = (a: string, b: string): number => {
  if (a.length !== b.length) {
    throw new Error("Strings must be of equal length");
  }

  let distance = 0;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      ++distance;
    }
  }

  return distance;
};

const getPatternScore = (pattern: string[], multiplier: number): number => {
  for (let i = 1; i < pattern.length; ++i) {
    let hamming = 0;
    let checkedWholePattern = true;
    for (let j = 1; j <= Math.min(i, pattern.length - i); ++j) {
      if (pattern[i - j] !== pattern[i + j - 1]) {
        hamming += hammingDistance(pattern[i - j], pattern[i + j - 1]);
      }

      if (hamming > 1) {
        checkedWholePattern = false;
        break;
      }
    }

    if (checkedWholePattern && hamming === 1) {
      return i * multiplier;
    }
  }

  return 0;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-13/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const patterns: string[][] = [];
  let next: string[] = [];
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i] === "") {
      patterns.push(next);
      next = [];
      continue;
    }

    next.push(lines[i]);
  }
  patterns.push(next);

  let res = 0;
  for (let i = 0; i < patterns.length; ++i) {
    const pattern = patterns[i];

    const rowScore = getPatternScore(pattern, ROW_MULTIPLIER);
    if (rowScore) {
      res += rowScore;
      continue;
    }

    // Transpose the pattern and consider as rows
    const transpose = pattern[0]
      .split("")
      .map((_, columnIndex) => pattern.map((row) => row[columnIndex]).join(""));
    const colScore = getPatternScore(transpose, COL_MULTIPLIER);
    res += colScore;
  }

  console.log(res);
};

main();
