import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-8/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const instructionSet = lines[0];
  const N = instructionSet.length;

  const routes: { [source: string]: string[] } = {};
  for (let i = 2; i < lines.length; ++i) {
    const parts = lines[i].split(" = ");
    const source = parts[0];
    const destinations = parts[1]
      .slice(1, -1)
      .split(", ")
      .map((item) => item.trim());

    routes[source] = destinations;
  }

  let currentLocation = "AAA";
  let steps = 0;

  while (currentLocation !== "ZZZ") {
    const direction = instructionSet[steps % N] === "L" ? 0 : 1;
    currentLocation = routes[currentLocation][direction];
    steps += 1;
  }

  console.log(steps);
};

main();
