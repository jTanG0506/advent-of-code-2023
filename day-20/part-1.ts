import * as fs from "fs";
import path from "path";

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
    }
  }

  const queue: { from: string; target: string; value: "high" | "low" }[] = [];
  const counts = { low: 0, high: 0 };

  for (let iter = 0; iter < 1000; ++iter) {
    queue.push({ target: "broadcaster", from: "button", value: "low" });
    counts.low++;

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

      if (valueToSend === "low") {
        counts.low += targets.length;
      } else {
        counts.high += targets.length;
      }
    }
  }

  console.log(counts.low * counts.high);
};

main();
