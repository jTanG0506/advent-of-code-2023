import * as fs from "fs";
import path from "path";

const getRoots = (a: number, b: number, c: number) => {
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    return [];
  }

  const sqrt = Math.sqrt(discriminant);
  const denominator = 2 * a;
  const root1 = (-b - sqrt) / denominator;
  const root2 = (-b + sqrt) / denominator;

  return [root1, root2];
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-6/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const t = lines[0].split(":")[1].trim().split(/\s+/).map(Number);
  const d = lines[1].split(":")[1].trim().split(/\s+/).map(Number);

  let res = 1;

  // s^2 - tw - d >= 0
  for (let i = 0; i < t.length; ++i) {
    let [root1, root2] = getRoots(1, -t[i], d[i]);

    if (Math.ceil(root1) === root1) {
      root1++;
    }

    if (Math.floor(root2) === root2) {
      root2--;
    }

    const ans = Math.floor(root2) - Math.ceil(root1);

    if (ans > 0) {
      res *= ans + 1;
    }
  }

  console.log(res);
};

main();
