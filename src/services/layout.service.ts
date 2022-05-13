import { Layout } from "../models";

export const generateRandomAliveCells = (dimension: number) => {
  const cells = dimension ** 2;
  const lowerBoundPopulation = Math.trunc(cells * 0.4);
  const upperBoundPopulation = Math.trunc(cells * 0.9);
  const randomAmount = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const aliveCellsAmount = randomAmount(lowerBoundPopulation, upperBoundPopulation);
  const aliveCells = [];

  for (let i = 0; i < aliveCellsAmount; i++) {
      const row = randomAmount(0, dimension - 1);
      const col = randomAmount(0, dimension - 1);

      aliveCells.push(`${row}:${col}`);
  }

  return aliveCells;
};

export const generateLayout = (dimension: number, aliveCells?: string[]):
    { layout: Layout, rows: string[][] } => {

    const layout = new Map();
    const rows: string[][] = [];

    for (let i = 0; i < dimension; i++) {
        rows.push([]);

        for (let j =  0; j < dimension; j++) {
            const id = `${i}:${j}`;
            let alive = false;
            aliveCells && aliveCells.indexOf(id) !== -1 && (alive = true);
            layout.set(id, { alive: alive, col: j, row: i, id });
            rows[i].push(id);
        }
    }

    return { layout, rows };
};

export const getNeighbours = (id: string, layout: Layout): string[] => {
    const element = layout.get(id);
    const neighbours = [];

    if (element) {
        const { row, col } = element;

        row - 1 > 0 && col - 1 > 0 && neighbours.push(`${row - 1}:${col - 1}`);
        row - 1 > 0 && col > 0 && neighbours.push(`${row - 1}:${col}`);
        row - 1 > 0 && col + 1 > 0 && neighbours.push(`${row - 1}:${col + 1}`);
        col + 1 > 0 && neighbours.push(`${row}:${col + 1}`);
        col - 1 > 0 && neighbours.push(`${row}:${col - 1}`);
        row + 1 > 0 && col - 1 > 0 && neighbours.push(`${row + 1}:${col - 1}`);
        row + 1 > 0 && neighbours.push(`${row + 1}:${col}`);
        row + 1 > 0 && col + 1 > 0 && neighbours.push(`${row + 1}:${col + 1}`);
    }

    return neighbours;
};

export const getDeadAliveNeighboursCount = (neighbours: string[], layout: Layout): { dead: number, alive: number } => {
    let dead = 0;
    let alive = 0;

    neighbours.forEach((neighbourId: string) => {
        const cell = layout.get(neighbourId);

        cell && cell.alive && alive++;
        cell && !cell.alive && dead++;
    });

    return { dead, alive };
};

export const updateLayout = (layout: Layout): Layout => {
  const newLayout = new Map();

  for (let [key, value] of layout) {
      const newValue = { ...value };
      const neighbours = getNeighbours(key, layout);
      const neighboursCount = getDeadAliveNeighboursCount(neighbours, layout);

      if (newValue.alive) {
          neighboursCount.alive < 2 && (newValue.alive = false);
          neighboursCount.alive > 3 && (newValue.alive = false);
      } else {
          neighboursCount.alive === 3 && (newValue.alive = true);
      }

      newLayout.set(key, newValue);
  }

  return newLayout;
};
