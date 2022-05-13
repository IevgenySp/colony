export type LayoutData = {
    id: string,
    alive: boolean,
    col: number,
    row: number
}

export type Layout = Map<string, LayoutData>;
