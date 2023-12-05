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

  let seedRanges: [number, number][] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([seeds[i], seeds[i] + seeds[i + 1]]);
  }

  const mappings: Array<
    Array<{
      sourceStart: number; // b
      destinationStart: number; // a
      rangeLength: number; // c
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

  for (let j = 0; j < mappings.length; ++j) {
    const mapping = mappings[j];

    const nextSeeds: [number, number][] = [];
    while (seedRanges.length > 0) {
      const range = seedRanges.pop();

      if (!range) {
        continue;
      }

      const [seedStart, seedEnd] = range;

      let mapped = false;
      for (let i = 0; i < mapping.length; ++i) {
        const { sourceStart, destinationStart, rangeLength } = mapping[i];

        const overlapStart = Math.max(seedStart, sourceStart);
        const overlapEnd = Math.min(seedEnd, sourceStart + rangeLength);

        if (overlapStart < overlapEnd) {
          nextSeeds.push([
            overlapStart - sourceStart + destinationStart,
            overlapEnd - sourceStart + destinationStart,
          ]);

          if (overlapStart > seedStart) {
            seedRanges.push([seedStart, overlapStart]);
          }

          if (overlapEnd < seedEnd) {
            seedRanges.push([overlapEnd, seedEnd]);
          }

          mapped = true;
        }

        if (mapped) {
          break;
        }
      }

      if (!mapped) {
        nextSeeds.push([seedStart, seedEnd]);
      }
    }

    seedRanges = nextSeeds;
  }

  seedRanges.sort((a, b) => a[0] - b[0]);
  console.log(seedRanges[0][0]);
};

main();
