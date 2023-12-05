import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-5/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const seeds = lines[0]
    .split(":")[1]
    .trim()
    .split(/\s+/)
    .map((s) => Number(s));

  const mappings: Array<
    Array<{
      sourceStart: number;
      destinationStart: number;
      rangeLength: number;
    }>
  > = [];

  let mappingIndex = 0;
  for (let i = 2; i < lines.length; ++i) {
    const line = lines[i];
    if (line === "") {
      mappingIndex++;
      continue;
    }

    if (line.indexOf(":") !== -1) {
      continue;
    }

    const [destinationStart, sourceStart, rangeLength] = line
      .split(" ")
      .map((s) => Number(s));

    if (!mappings[mappingIndex]) {
      mappings[mappingIndex] = [];
    }

    mappings[mappingIndex].push({
      destinationStart,
      sourceStart,
      rangeLength,
    });
  }

  const res: number[] = [];

  for (let i = 0; i < seeds.length; ++i) {
    let location = seeds[i];

    for (let j = 0; j < mappings.length; ++j) {
      const mapping = mappings[j];

      for (let k = 0; k < mapping.length; ++k) {
        const { destinationStart, sourceStart, rangeLength } = mapping[k];

        if (location >= sourceStart && location < sourceStart + rangeLength) {
          location = destinationStart + (location - sourceStart);
          break;
        }
      }
    }

    res.push(location);
  }

  console.log(Math.min(...res));
};

main();
