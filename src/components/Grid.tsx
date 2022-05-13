import React, { useContext, memo } from 'react';
import { GridContainerContext } from './context/GridContainer';
import Cell from './Cell';
import styles from './Grid.module.scss';

export const Grid: React.FC = () => {
    const { layout, rows, cellSize } = useContext(GridContainerContext);
    const rowHTML = (cells: string[], key: string | number) => {
        return (
            <div key={key} className={styles?.row}>
                { cells.map((cell: string) => {
                    return <Cell
                        key={cell}
                        cellSize={cellSize}
                        isAlive={layout.get(cell)?.alive || false}
                    />
                }) }
            </div>
        )
    };

    return (
        <div className={styles?.container} data-testid='grid'>
            { rows.map((row: string[], index) => {
                return rowHTML(row, index);
            }) }
        </div>
    )
};

export default memo(Grid);
