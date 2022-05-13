import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';
import { FullPresets, Layout, Presets } from "../../models";
import { presets } from "../../constants/constants";
import { generateLayout, generateRandomAliveCells, updateLayout as newLayout } from "../../services";

const getInitialState = (): FullPresets => {
    const colonyCookie = Cookies.get('colony-preset');
    let currentPreset: Presets = presets.default;

    if (colonyCookie) {
        currentPreset = JSON.parse(colonyCookie);
    } else {
        Cookies.set('colony-preset', JSON.stringify(currentPreset));
    }

    let aliveCells = currentPreset.aliveCells;

    if (currentPreset.type === 'default') {
        aliveCells = generateRandomAliveCells(currentPreset.size);
    }

    const gridLayout = generateLayout(currentPreset.size, aliveCells);

    return {
        ...currentPreset,
        ...gridLayout,
        tick: 0,
        updateTick: () => {},
        updateLayout: () => {},
        updatePreset: (newPreset: string) => {}
    };
};

const getNewState = (newPreset: string): FullPresets => {
    const preset: Presets = (presets as any)[newPreset];
    let aliveCells = preset.aliveCells;

    if (preset.type === 'default') {
        aliveCells = generateRandomAliveCells(preset.size);
    }

    const gridLayout = generateLayout(preset.size, aliveCells);

    Cookies.set('colony-preset', JSON.stringify(preset));

    return {
        ...preset,
        ...gridLayout,
        tick: 0,
        updateTick: () => {},
        updateLayout: () => {},
        updatePreset: (newPreset: string) => {}
    };
};

const useGridContainer = (): FullPresets => {
    const initState = getInitialState();
    const [tick, setTick] = useState<number>(0);
    const [layout, setLayout] = useState<Layout>(initState.layout);
    const [rows, setRows] = useState<string[][]>(initState.rows);
    const [meta, setMeta] = useState<{
        label: string,
        type: string,
        size: number,
        cellSize: number,
        aliveCells: string[] | undefined
    }>({
        label: initState.label,
        type: initState.type,
        size: initState.size,
        cellSize: initState.cellSize,
        aliveCells: initState.aliveCells,
    });

    const updateTick = useCallback(() => {
        const newTick = tick+1;

        setTick(newTick);
    }, [tick, setTick]);

    const updateLayout = useCallback(() => {
        const newLayoutSnapshot = newLayout(layout);

        setLayout(newLayoutSnapshot);
    }, [layout, setLayout]);

    const updatePreset = useCallback((newPreset: string) => {
        const newState = getNewState(newPreset);

        setTick(newState.tick);
        setLayout(newState.layout);
        setRows(newState.rows);
        setMeta({
            label: newState.label,
            type: newState.type,
            size: newState.size,
            cellSize: newState.cellSize,
            aliveCells: newState.aliveCells,
        })
    }, []);

    return {
        label: meta.label,
        type: meta.type,
        size: meta.size,
        cellSize: meta.cellSize,
        aliveCells: meta.aliveCells,
        layout,
        rows,
        tick,
        updateTick,
        updateLayout,
        updatePreset
    }
};

export default useGridContainer;
