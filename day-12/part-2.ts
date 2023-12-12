import * as fs from "fs";
import path from "path";

const OPERATIONAL = ".";
const DAMAGED = "#";
const UNKNOWN = "?";

const countArrangements = (
  record: string,
  groups: number[],
  memo: { [key: string]: number }
): number => {
  if (record === "") {
    return groups.length === 0 ? 1 : 0;
  }

  if (!groups.length) {
    return record.includes(DAMAGED) ? 0 : 1;
  }

  const key = `${record}-${groups.join(",")}`;
  if (key in memo) {
    return memo[key];
  }

  let res = 0;
  const current = record[0];
  if (current === OPERATIONAL || current === UNKNOWN) {
    res += countArrangements(record.slice(1), groups, memo);
  }

  if (current === DAMAGED || current === UNKNOWN) {
    if (
      groups[0] <= record.length &&
      !record.slice(0, groups[0]).includes(OPERATIONAL) &&
      (groups[0] === record.length || record[groups[0]] !== DAMAGED)
    ) {
      res += countArrangements(
        record.slice(groups[0] + 1),
        groups.slice(1),
        memo
      );
    }
  }

  memo[key] = res;

  return res;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-12/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const memo: { [key: string]: number } = {};

  let res = 0;
  for (let i = 0; i < lines.length; ++i) {
    const data = lines[i].split(" ");
    const record = Array(5).fill(data[0]).join(UNKNOWN);
    const groups = Array(5)
      .fill(data[1])
      .join(",")
      .split(",")
      .map((c) => Number(c));

    res += countArrangements(record, groups, memo);
  }

  console.log(res);
};

main();
