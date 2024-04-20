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
    const startedAt = Date.now();
    const [curPosition, setCurPosition] = useState(end - startedAt);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurPosition((prevProsition) => prevProsition - INTERVAL_STEP)
        }, INTERVAL_STEP)

        return () => {
            clearInterval(interval);
        }
    }, [start, end, startedAt])

    useEffect(() => {
        setCurPosition(end - startedAt);
    }, [start, end, startedAt])

    const total = end - start;

    return 100 - Math.floor((curPosition / total) * 100);
}