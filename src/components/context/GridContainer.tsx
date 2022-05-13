import { createContext } from 'react';
import { presets } from '../../constants/constants';
import useGridContainer from './useGridContainer';
import { FullPresets } from '../../models';

const initialState: FullPresets = {
    ...presets.default,
    layout: new Map(),
    rows: [],
    tick: 0,
    updateTick: () => {},
    updateLayout: () => {},
    updatePreset: () => {}
};

export const GridContainerContext = createContext(initialState);

export const GridContainer: React.FC<{ children: React.ReactNode }> = (props) => {
    const container = useGridContainer();

    return (
        <GridContainerContext.Provider value={{ ...container }}>
            {props.children}
        </GridContainerContext.Provider>
);
};

export default GridContainer;
