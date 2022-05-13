import React, { useEffect, useState, memo } from 'react';
import styles from './Cell.module.scss';

export const Cell: React.FC<{ isAlive: boolean, cellSize: number }> = ({ isAlive, cellSize }) => {
    const [alive, setAlive] = useState<boolean>(isAlive);

    useEffect(() => {
        setAlive(isAlive);
    }, [isAlive]);

    return <div
        style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
        className={`${styles?.container} ${ alive && styles?.alive }`}
        data-testid={'cell-test'}
    />
};

export default memo(Cell);
