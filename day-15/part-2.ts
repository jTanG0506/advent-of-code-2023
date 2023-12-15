import * as fs from "fs";
import path from "path";

interface Lens {
  label: string;
  focalLength: number;
}

const main = () => {
  const filePath = path.join(process.cwd(), "day-15/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");
  const sequences = lines[0].split(",");

  let boxes: { [key: number]: Lens[] } = {};
  for (let i = 0; i < sequences.length; ++i) {
    let opIndex = sequences[i].indexOf("-");
    if (opIndex === -1) {
      opIndex = sequences[i].indexOf("=");
    }

    const label = sequences[i].substring(0, opIndex);
    const operator = sequences[i][opIndex];

    let labelValue = 0;
    for (let j = 0; j < label.length; ++j) {
      const v = label[j].charCodeAt(0);
      labelValue += v;
      labelValue *= 17;
      labelValue = labelValue % 256;
    }

    const lens = boxes[labelValue] ?? [];
    const idx = lens.findIndex((l) => l.label === label);

    if (operator === "-") {
      if (idx !== -1) {
        lens.splice(idx, 1);
        boxes[labelValue] = lens;
      }
    } else {
      const focalLength = parseInt(sequences[i].substring(opIndex + 1));
      if (idx !== -1) {
        boxes[labelValue][idx].focalLength = focalLength;
      } else {
        if (!boxes[labelValue]) {
          boxes[labelValue] = [];
        }

        boxes[labelValue].push({ label, focalLength });
      }
    }
  }

  let res = 0;
  for (const [key, lenses] of Object.entries(boxes)) {
    const boxIndex = parseInt(key) + 1;
    for (let i = 0; i < lenses.length; ++i) {
      res += boxIndex * (i + 1) * lenses[i].focalLength;
    }
  }
  console.log(res);
};

main();
