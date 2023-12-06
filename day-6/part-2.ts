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

  const t = Number(lines[0].split(":")[1].trim().split(/\s+/).join(""));
  const d = Number(lines[1].split(":")[1].trim().split(/\s+/).join(""));

  // s^2 - tw - d >= 0
  let [root1, root2] = getRoots(1, -t, d);

  if (Math.ceil(root1) === root1) {
    root1++;
  }

  if (Math.floor(root2) === root2) {
    root2--;
  }

  const ans = Math.floor(root2) - Math.ceil(root1);
  console.log(ans > 0 ? ans + 1 : 0);
};

main();
