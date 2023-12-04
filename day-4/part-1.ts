import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-4/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const cards = data.split("\n");

  let ans = 0;
  for (let i = 0; i < cards.length; ++i) {
    const card = cards[i].split(":");
    const [winningNumbers, myNumbers] = card[1].split("|");

    const winningNumbersSet = new Set(winningNumbers.trim().split(/\s+/));
    const myNumbersArr = myNumbers.trim().split(/\s+/);

    let matches = 0;
    for (let j = 0; j < myNumbersArr.length; ++j) {
      if (winningNumbersSet.has(myNumbersArr[j])) {
        matches++;
      }
    }

    if (matches) {
      ans += Math.pow(2, matches - 1);
    }
  }

  console.log(ans);
};

main();
