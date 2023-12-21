import * as fs from "fs";
import path from "path";

const lcm = (a: number, b: number): number => {
  const gcd = (a: number, b: number): number => {
    if (a === 0) {
      return b;
    }

    return gcd(b % a, a);
  };

  return (a * b) / gcd(a, b);
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-20/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const routes: { [key: string]: string[] } = {};
  const states: {
    [key: string]: {
      inputs: string[];
      type: "%" | "&" | "";
      enabled: boolean;
      currentState: { [input: string]: "high" | "low" };
    };
  } = {};

  // Assume there is exactly one & feeds into rx denoted A, and multiple & feeds into A.
  // For rx to receive a single low pulse, A must receive a high pulse from all of its inputs.
  let A = "";

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i].split(" -> ");
    const rawFrom = line[0];
    const to = line[1].split(", ");

    let from = rawFrom;
    let type: "%" | "&" | "" = "";
    if (rawFrom[0] === "%" || rawFrom[0] === "&") {
      from = rawFrom.substring(1);
      type = rawFrom[0];
    }

    routes[from] = to;
    states[from] = {
      inputs: [],
      type,
      enabled: false,
      currentState: {},
    };
  }

  for (const [from, to] of Object.entries(routes)) {
    for (let i = 0; i < to.length; ++i) {
      if (states[to[i]]?.type === "&") {
        states[to[i]].inputs = [...states[to[i]].inputs, from];
        states[to[i]].currentState[from] = "low";
      }

      if (to[i] === "rx") {
        A = from;
      }
    }
  }

  // Find all the nodes that feed into A. Each node of B must send a high pulse to A.
  const B: string[] = [];
  for (const [from, to] of Object.entries(routes)) {
    if (to.includes(A)) {
      B.push(from);
    }
  }

  const cycleLength: { [key: string]: number } = {};
  const queue: { from: string; target: string; value: "high" | "low" }[] = [];

  let iter = 0;
  let hasSentToRX = false;
  while (!hasSentToRX) {
    iter++;
    queue.push({ target: "broadcaster", from: "button", value: "low" });

    while (queue.length) {
      const item = queue.shift();

      if (!item || routes[item.target]?.length === 0) {
        continue;
      }

      const state = states[item.target];
      const targets = routes[item.target];

      if (!state) {
        continue;
      }

      if (item.target === A && item.value === "high") {
        if (!(item.from in cycleLength)) {
          cycleLength[item.from] = iter;
        }

        if (Object.entries(cycleLength).length === B.length) {
          hasSentToRX = true;
          break;
        }
      }

      let valueToSend: "high" | "low" = item.value;

      if (state.type === "%") {
        if (item.value === "high") {
          continue;
        } else {
          state.enabled = !state.enabled;
          valueToSend = state.enabled ? "high" : "low";
        }
      } else if (state.type === "&") {
        state.currentState[item.from] = item.value;

        let allHigh = true;
        for (const [_, value] of Object.entries(state.currentState)) {
          if (value === "low") {
            allHigh = false;
            break;
          }
        }

        valueToSend = allHigh ? "low" : "high";
      }

      for (let i = 0; i < targets.length; ++i) {
        queue.push({
          from: item.target,
          target: targets[i],
          value: valueToSend,
        });
      }
    }
  }

  let ans = 1;
  for (const [_key, value] of Object.entries(cycleLength)) {
    ans = lcm(ans, value);
  }

  console.log(ans);
};

main();
