import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-4/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const cards = data.split("\n");

  const cardCount: { [cardNumber: string]: number } = {};

  const N = cards.length;

  for (let i = 1; i <= N; ++i) {
    cardCount[i] = 1;
  }

  let ans = 0;
  for (let i = 0; i < N; ++i) {
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

    const cardNumber = i + 1;
    const numOfCards = cardCount[cardNumber];

    for (let i = 1; i <= matches && i <= N; ++i) {
      cardCount[cardNumber + i] += numOfCards;
    }

    ans += cardCount[cardNumber];
  }

  console.log(ans);
};

main();
