import * as fs from "fs";
import path from "path";

type Rule = {
  input?: "x" | "m" | "a" | "s";
  comparator?: "<" | ">";
  target?: number;
  output: string;
};

interface Range {
  min: number;
  max: number;
}

interface InputRange {
  x: Range;
  m: Range;
  a: Range;
  s: Range;
}

const count = (
  ranges: InputRange,
  workflows: { [key: string]: Rule[] },
  workflow = "in"
) => {
  if (workflow === "R") {
    return 0;
  }

  if (workflow === "A") {
    let res = 1;
    for (const key in ranges) {
      const _key = key as keyof InputRange;
      res *= ranges[_key].max - ranges[_key].min + 1;
    }
    return res;
  }

  const rules = workflows[workflow];
  const fallbackRule = rules[rules.length - 1].output;
  let total = 0;

  let processed = true;
  for (let i = 0; i < rules.length - 1; ++i) {
    const { input, comparator, target, output } = rules[i];

    const { min, max } = ranges[input!];
    let T: Range;
    let F: Range;

    if (comparator === "<") {
      T = { min, max: Math.min(target! - 1, max) };
      F = { min: Math.max(target!, min), max };
    } else {
      T = { min: Math.max(target! + 1, min), max };
      F = { min, max: Math.min(target!, max) };
    }

    if (T.min <= T.max) {
      const newRanges = { ...ranges, [input!]: T };
      total += count(newRanges, workflows, output);
    }

    if (F.min <= F.max) {
      ranges[input!] = F;
    } else {
      break;
    }
  }

  total += count(ranges, workflows, fallbackRule);

  return total;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-19/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const workflows: { [key: string]: Rule[] } = {};
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    if (line === "") {
      break;
    }

    const s = line.split("{");

    const id = s[0];
    const data = s[1].slice(0, s[1].length - 1);

    const rules: Rule[] = [];
    const rulesData = data.split(",");

    for (let j = 0; j < rulesData.length; ++j) {
      const ruleData = rulesData[j].split(":");
      if (ruleData.length === 1) {
        rules.push({
          output: ruleData[0],
        });
        continue;
      }

      const input = ruleData[0][0] as "x" | "m" | "a" | "s";
      const comparator = ruleData[0][1] as "<" | ">";
      const target = parseInt(ruleData[0].slice(2));

      rules.push({
        input,
        comparator,
        target,
        output: ruleData[1],
      });
    }

    workflows[id] = rules;
  }

  const res = count(
    {
      x: { min: 1, max: 4000 },
      m: { min: 1, max: 4000 },
      a: { min: 1, max: 4000 },
      s: { min: 1, max: 4000 },
    },
    workflows
  );
  console.log(res);
};

main();
