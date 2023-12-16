import * as fs from "fs";
import path from "path";

interface Position {
  row: number;
  column: number;
  direction: [0, 1] | [0, -1] | [1, 0] | [-1, 0];
}

const safePush = (seen: Set<string>, position: Position, queue: Position[]) => {
  const key = `${position.row},${position.column},${position.direction}`;
  if (seen.has(key)) {
    return;
  }

  seen.add(key);
  queue.push(position);
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-16/input.txt");

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n").map((line) => line.split(""));

  const startPositions: Position[] = [];
  let res = 0;

  const rows = lines.length;
  const columns = lines[0].length;

  for (let i = 0; i < rows; ++i) {
    startPositions.push({
      row: i,
      column: -1,
      direction: [0, 1],
    });

    startPositions.push({
      row: i,
      column: columns,
      direction: [0, -1],
    });
  }

  for (let i = 0; i < columns; ++i) {
    startPositions.push({
      row: -1,
      column: i,
      direction: [1, 0],
    });

    startPositions.push({
      row: rows,
      column: i,
      direction: [-1, 0],
    });
  }

  for (let i = 0; i < startPositions.length; ++i) {
    const seen = new Set<string>();
    const queue: Position[] = [];
    safePush(seen, startPositions[i], queue);

    while (queue.length > 0) {
      const position = queue.shift()!;

      const [dy, dx] = position.direction;
      if (position.row + dy < 0 || position.row + dy >= lines.length) {
        continue;
      }

      if (position.column + dx < 0 || position.column + dx >= lines[0].length) {
        continue;
      }

      const [nextRow, nextColumn] = [position.row + dy, position.column + dx];
      const nextChar = lines[nextRow][nextColumn];

      const nextPosition: Omit<Position, "direction"> = {
        row: nextRow,
        column: nextColumn,
      };

      if (nextChar === ".") {
        safePush(
          seen,
          {
            ...nextPosition,
            direction: position.direction,
          },
          queue
        );
        continue;
      }

      if (nextChar === "\\") {
        let nextDirection: Position["direction"] = position.direction;
        if (dx === -1) {
          nextDirection = [-1, 0];
        } else if (dx === 1) {
          nextDirection = [1, 0];
        } else if (dy === -1) {
          nextDirection = [0, -1];
        } else if (dy === 1) {
          nextDirection = [0, 1];
        }

        safePush(
          seen,
          {
            ...nextPosition,
            direction: nextDirection,
          },
          queue
        );
        continue;
      }

      if (nextChar === "/") {
        let nextDirection: Position["direction"] = position.direction;
        if (dx === -1) {
          nextDirection = [1, 0];
        } else if (dx === 1) {
          nextDirection = [-1, 0];
        } else if (dy === -1) {
          nextDirection = [0, 1];
        } else if (dy === 1) {
          nextDirection = [0, -1];
        }

        safePush(
          seen,
          {
            ...nextPosition,
            direction: nextDirection,
          },
          queue
        );
        continue;
      }

      if (nextChar === "|") {
        if (dx === 0) {
          safePush(
            seen,
            {
              ...nextPosition,
              direction: position.direction,
            },
            queue
          );
          continue;
        }

        // Split into two beams
        safePush(
          seen,
          {
            ...nextPosition,
            direction: [1, 0],
          },
          queue
        );
        safePush(
          seen,
          {
            ...nextPosition,
            direction: [-1, 0],
          },
          queue
        );
        continue;
      }

      if (nextChar === "-") {
        if (dy === 0) {
          safePush(
            seen,
            {
              ...nextPosition,
              direction: position.direction,
            },
            queue
          );
          continue;
        }

        // Split into two beams
        safePush(
          seen,
          {
            ...nextPosition,
            direction: [0, -1],
          },
          queue
        );
        safePush(
          seen,
          {
            ...nextPosition,
            direction: [0, 1],
          },
          queue
        );
        continue;
      }
    }

    const visited = new Set<string>();
    for (let key of seen.keys()) {
      const [row, column] = key.split(",").map((x) => parseInt(x, 10));
      visited.add(`${row}, ${column}`);
    }

    // Remove initial position at (0, -1)
    res = Math.max(res, visited.size - 1);
  }

  console.log(res);
};

main();
