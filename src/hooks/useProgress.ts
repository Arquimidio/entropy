import { useState, useEffect } from "react";

interface ProgressProps {
    start: number,
    end: number,
}

const INTERVAL_STEP = 1000;

export default function useProgress({
    start,
    end,
}: ProgressProps) {
    const curTime = Date.now();
    const [curPosition, setCurPosition] = useState(end - curTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurPosition((prevProsition) => prevProsition - INTERVAL_STEP)
        }, INTERVAL_STEP)

        return () => {
            clearInterval(interval);
        }
    }, [start, end])

    useEffect(() => {
        setCurPosition(end - curTime);
    }, [start, end])

    const total = end - start;

    return {
        percentage: 100 - Math.floor((curPosition / total) * 100),
    }
}