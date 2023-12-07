import * as fs from "fs";
import path from "path";

const getValue = (card: string) => {
  const faceCards: { [faceValue: string]: number } = {
    A: 14,
    K: 13,
    Q: 12,
    T: 10,
    J: 1,
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

// If there is J, it is now a joker, can act as any card
const determineCardType = (hand: string): HandType => {
  const cards = hand.split("");
  const cardCount: { [key: string]: number } = {};
  let jCount = 0;
  cards.forEach((card) => {
    if (card === "J") {
      jCount++;
      return;
    }

    if (cardCount[card]) {
      cardCount[card]++;
    } else {
      cardCount[card] = 1;
    }
  });

  const cardCountValues = Object.values(cardCount);

  const hasFiveOfAKind = cardCountValues.includes(5);
  const hasFourOfAKind = cardCountValues.includes(4);
  const hasThreeOfAKind = cardCountValues.includes(3);
  const hasTwoOfAKind = cardCountValues.includes(2);

  const numOfPairs = cardCountValues.filter((count) => count === 2).length;

  if (
    hasFiveOfAKind ||
    (hasFourOfAKind && jCount === 1) ||
    (hasThreeOfAKind && jCount === 2) ||
    (hasTwoOfAKind && jCount === 3) ||
    jCount >= 4
  ) {
    return "FiveOfAKind";
  }

  if (
    hasFourOfAKind ||
    (hasThreeOfAKind && jCount === 1) ||
    (hasTwoOfAKind && jCount === 2) ||
    jCount >= 3
  ) {
    return "FourOfAKind";
  }

  if (
    (hasThreeOfAKind && hasTwoOfAKind) ||
    (hasTwoOfAKind && jCount === 2) ||
    (numOfPairs === 2 && jCount === 1) ||
    jCount >= 3
  ) {
    return "FullHouse";
  }

  if (hasThreeOfAKind || (hasTwoOfAKind && jCount === 1) || jCount >= 2) {
    return "ThreeOfAKind";
  }

  if (numOfPairs === 2 || (hasTwoOfAKind && jCount === 1) || jCount >= 2) {
    return "TwoPair";
  }

  if (numOfPairs === 1 || jCount >= 1) {
    return "OnePair";
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
