import * as fs from "fs";
import path from "path";

type Rule = {
  input?: "x" | "m" | "a" | "s";
  comparator?: "<" | ">";
  target?: number;
  output: string;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-19/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  let ratingsIndex = 0;

  const workflows: { [key: string]: Rule[] } = {};
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    if (line === "") {
      ratingsIndex = i + 1;
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

  let res = 0;
  for (let i = ratingsIndex; i < lines.length; ++i) {
    const ratingData = lines[i].slice(1, lines[i].length - 1).split(",");
    const rating: { [key: string]: number } = {};
    for (let j = 0; j < ratingData.length; ++j) {
      const [key, value] = ratingData[j].split("=");
      rating[key] = parseInt(value);
    }

    let state = "in";
    while (!["A", "R"].includes(state)) {
      const rules = workflows[state];
      let next = "";
      for (let j = 0; j < rules.length; ++j) {
        const rule = rules[j];

        if (rule.input === undefined) {
          next = rule.output;
          break;
        }

        const input = rating[rule.input];
        if (rule.comparator === "<") {
          if (input < rule.target!) {
            next = rule.output;
            break;
          }
        } else {
          if (input > rule.target!) {
            next = rule.output;
            break;
          }
        }
      }

      state = next;
    }

    if (state === "A") {
      res += rating["x"] + rating["m"] + rating["a"] + rating["s"];
    }
  }

  console.log(res);
};

main();
