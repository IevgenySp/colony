import { Layout } from './Layout';

export type Presets = {
    label: string,
    type: string,
    size: number,
    cellSize: number,
    aliveCells: string[] | undefined
}

export type FullPresets = {
    label: string,
    type: string,
    size: number,
    cellSize: number,
    aliveCells: string[] | undefined,
    layout: Layout,
    rows: string[][],
    tick: number,
    updateTick: () => void,
    updateLayout: () => void,
    updatePreset: (newPreset: string) => void
}

