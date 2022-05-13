import React, {useContext, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import styles from './ControlPanel.module.scss';
import { GridContainerContext } from './context/GridContainer';
import { presets, speed } from '../constants/constants';
import { Presets } from "../models";
import Cookies from "js-cookie";

export const ControlPanel: React.FC = () => {
    const { tick, updateTick, updateLayout, updatePreset } = useContext(GridContainerContext);
    const presetCookie = Cookies.get('colony-preset');
    const speedCookie = Cookies.get('colony-refresh-speed');
    const selectValue = presetCookie ? JSON.parse(presetCookie).type : presets.default.type;
    const speedValue = speedCookie ? JSON.parse(speedCookie) : speed[1];
    const [ select, setSelect ] = useState<string>(selectValue);
    const [ refresh, setRefresh ] = useState<string | number>(speedValue);
    const [ isPlaying, setIsPlaying ] = useState<boolean>(false);
    const [ playingTime, setPlayingTime ] = useState<number>(0);
    const [ plaingInterval, setPlayingInterval ] = useState<any>(undefined);

    const tickHandler = (): void => {
        if (isPlaying) {
            clearInterval(plaingInterval);

            setIsPlaying(false);
            setPlayingInterval(undefined);
            setPlayingTime(0);
        } else {
            setIsPlaying(true);
        }
    };

    const handleRefreshSpeedChange = (event: SelectChangeEvent): void => {
        setRefresh(event.target.value as string);
        Cookies.set('colony-refresh-speed', event.target.value);

        if (isPlaying) {
            clearInterval(plaingInterval);

            setIsPlaying(false);
            setPlayingInterval(undefined);
            setTimeout(() => setIsPlaying(true), 1000);
        }
    };

    const handleSelectChange = (event: SelectChangeEvent): void => {
        setSelect(event.target.value as string);
        updatePreset(event.target.value  as string);

        clearInterval(plaingInterval);

        setIsPlaying(false);
        setPlayingInterval(undefined);
        setPlayingTime(0);
    };
    const menuItems = Object.values(presets).map((preset: Presets) => {
        return <MenuItem key={preset.type} value={preset.type}>{preset.label}</MenuItem>
    });
    const refreshItems = speed.map((item: string | number) => {
        return <MenuItem key={item} value={item.toString()}>{`speed ms: ${item}`}</MenuItem>
    });

    useEffect(() => {
        let interval: any = undefined;

        if (isPlaying) {
            interval = setInterval(() => {
                setPlayingTime(playingTime => playingTime + Number(refresh));
            }, Number(refresh));
            setPlayingInterval(interval);
        }

        return () => interval && clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying) {
            updateTick();
            updateLayout();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playingTime]);

    return (
        <div className={styles?.container} data-testid='control-panel'>
            <div className={styles?.label}>Colony</div>
            <FormControl>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={select}
                    label="Select colony preset"
                    onChange={handleSelectChange}
                    inputProps={{ "data-testid": "presets-input" }}
                    sx={{
                        width: 200,
                        height: 36,
                        border: "1px solid #ebebeb",
                        color: "#ebebeb",
                        fontSize: "14px",
                        marginRight: '10px',
                        "& .MuiSvgIcon-root": {
                            color: "#ebebeb",
                        },
                    }}
                >
                    { menuItems }
                </Select>
            </FormControl>
            <FormControl>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={refresh as string}
                    label="Refresh speed"
                    onChange={handleRefreshSpeedChange}
                    inputProps={{ "data-testid": "speed-input" }}
                    sx={{
                        width: 150,
                        height: 36,
                        border: "1px solid #ebebeb",
                        color: "#ebebeb",
                        fontSize: "14px",
                        marginRight: '10px',
                        "& .MuiSvgIcon-root": {
                            color: "#ebebeb",
                        },
                    }}
                >
                    { refreshItems }
                </Select>
            </FormControl>
            <Button
                variant="contained"
                onClick={tickHandler}
            >{isPlaying ? 'Stop ticking' : 'Start ticking'}</Button>
            <div
                className={styles?.tick}
                data-testid='refresh-tick'
            >
                { `Current tick: ${tick}` }
            </div>
        </div>
    );
};

export default ControlPanel;
