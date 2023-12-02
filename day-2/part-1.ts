import * as fs from "fs";
import path from "path";

const config: { [color: string]: number } = {
  red: 12,
  green: 13,
  blue: 14,
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-2/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const games = data.split("\n");

  let ans = 0;
  for (let i = 0; i < games.length; ++i) {
    const row = games[i].split(":");

    let validGame = true;
    const rounds = row[1].split(";");
    for (let j = 0; j < rounds.length; ++j) {
      const round = rounds[j].trim();
      const colors = round.split(", ");

      for (let k = 0; k < colors.length; ++k) {
        const [count, color] = colors[k].split(" ");
        if (Number(count) > config[color]) {
          validGame = false;
          break;
        }
      }

      if (!validGame) {
        break;
      }
    }

    if (validGame) {
      const gameNumber = row[0].split(" ")[1];
      ans += Number(gameNumber);
    }
  }

  console.log(ans);
};

main();
