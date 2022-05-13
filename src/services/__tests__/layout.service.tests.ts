import { generateLayout, getNeighbours, getDeadAliveNeighboursCount } from "../layout.service";
import { presets } from "../../constants/constants";

it('Check generateLayout', () => {
    const layout = generateLayout(5, presets.preset3.aliveCells);

    expect(layout.layout.size).toBe(25);
    expect(layout.rows.length).toBe(5);
    expect(layout.layout.get('1:2')?.alive).toBe(true);
});

it('Check getNeighbours', () => {
    const layout = generateLayout(5, presets.preset3.aliveCells);
    const neighbours = getNeighbours('2:2', layout.layout);
    const neighbours2 = getNeighbours('0:0', layout.layout);
    const neighboursCount = getDeadAliveNeighboursCount(neighbours, layout.layout);

    expect(neighbours.length).toBe(8);
    expect(neighboursCount.dead).toBe(3);
    expect(neighboursCount.alive).toBe(5);
    expect(neighbours2.length).toBe(3);
});
