import * as fs from "fs";
import path from "path";

const lcm = (a: number, b: number): number => {
  const gcd = (a: number, b: number): number => {
    if (a === 0) {
      return b;
    }

    return gcd(b % a, a);
  };

  return (a * b) / gcd(a, b);
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-8/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const instructionSet = lines[0];
  const N = instructionSet.length;

  const startLocations: string[] = [];
  const routes: { [source: string]: string[] } = {};
  for (let i = 2; i < lines.length; ++i) {
    const parts = lines[i].split(" = ");
    const source = parts[0];
    const destinations = parts[1]
      .slice(1, -1)
      .split(", ")
      .map((item) => item.trim());

    routes[source] = destinations;

    if (source[source.length - 1] === "A") {
      startLocations.push(source);
    }
  }

  const ans: number[] = [];
  for (let i = 0; i < startLocations.length; ++i) {
    let currentLocation = startLocations[i];
    let steps = 0;

    while (currentLocation[currentLocation.length - 1] !== "Z") {
      const direction = instructionSet[steps % N] === "L" ? 0 : 1;
      currentLocation = routes[currentLocation][direction];
      steps += 1;
    }

    ans.push(steps);
  }

  let res = ans[0];
  for (let i = 1; i < ans.length; ++i) {
    res = lcm(res, ans[i]);
  }

  console.log(res);
};

main();
