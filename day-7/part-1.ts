import * as fs from "fs";
import path from "path";

const getValue = (card: string) => {
  const faceCards: { [faceValue: string]: number } = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
  };

  if (isNaN(Number(card))) {
    return faceCards[card];
  }

  return Number(card);
};

const comparator = (a: string, b: string) => {
  let _a = getValue(a);
  let _b = getValue(b);

  return _a - _b;
};

type HandType =
  | "FiveOfAKind"
  | "FourOfAKind"
  | "FullHouse"
  | "ThreeOfAKind"
  | "TwoPair"
  | "OnePair"
  | "HighCard";

const handTypeRanks: HandType[] = [
  "FiveOfAKind",
  "FourOfAKind",
  "FullHouse",
  "ThreeOfAKind",
  "TwoPair",
  "OnePair",
  "HighCard",
];

const determineCardType = (hand: string): HandType => {
  const cards = hand.split("");
  const cardCount: { [key: string]: number } = {};
  cards.forEach((card) => {
    if (cardCount[card]) {
      cardCount[card]++;
    } else {
      cardCount[card] = 1;
    }
  });

  const cardCountValues = Object.values(cardCount);

  if (cardCountValues.includes(5)) {
    return "FiveOfAKind";
  }

  if (cardCountValues.includes(4)) {
    return "FourOfAKind";
  }

  if (cardCountValues.includes(3) && cardCountValues.includes(2)) {
    return "FullHouse";
  }

  if (cardCountValues.includes(3)) {
    return "ThreeOfAKind";
  }

  if (cardCountValues.includes(2)) {
    if (cardCountValues.length === 3) {
      return "TwoPair";
    } else {
      return "OnePair";
    }
  }

  return "HighCard";
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-7/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const hands: { hand: string; type: HandType; bidAmount: number }[] = [];
  for (let i = 0; i < lines.length; ++i) {
    const values = lines[i].split(/\s+/);
    const hand = values[0];
    const bidAmount = Number(values[1]);

    const type = determineCardType(hand);
    hands.push({ hand, type, bidAmount });
  }

  hands.sort((a, b) => {
    if (a.type === b.type) {
      for (let i = 0; i < a.hand.length; ++i) {
        if (a.hand[i] !== b.hand[i]) {
          return comparator(b.hand[i], a.hand[i]);
        }
      }

      return 0;
    }

    return handTypeRanks.indexOf(a.type) - handTypeRanks.indexOf(b.type);
  });

  let res = 0;
  for (let i = 0; i < hands.length; ++i) {
    res += hands[i].bidAmount * (hands.length - i);
  }

  console.log(res);
};

main();
