import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-2/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const games = data.split("\n");

  let ans = 0;
  for (let i = 0; i < games.length; ++i) {
    const row = games[i].split(":");

    const minBalls: { [color: string]: number } = {
      red: 0,
      green: 0,
      blue: 0,
    };

    const rounds = row[1].split(";");
    for (let j = 0; j < rounds.length; ++j) {
      const round = rounds[j].trim();
      const colors = round.split(", ");

      for (let k = 0; k < colors.length; ++k) {
        const [count, color] = colors[k].split(" ");
        minBalls[color] = Math.max(minBalls[color], Number(count));
      }
    }

    ans += minBalls.red * minBalls.green * minBalls.blue;
  }

  console.log(ans);
};

main();
