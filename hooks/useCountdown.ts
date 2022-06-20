import { useEffect, useState } from "react";
import { setIntervalImmediately } from "../utils/helpers";
import { getCurrentTimestamp } from "../utils/time";

export const useCountdown = (endTimestamp: number) => {

    const [countdown, setCountdown] = useState<{
        weeks: number;
        days: number;
        hours: number;
        minutes: number;
    }>();
    const [secondsLeft, setSecondsLeft] = useState<number>();
    const [isSet, setIsSet] = useState<boolean>(false)
    
    const init = async () => {
        const currentTimestamp = await getCurrentTimestamp();
        if (!currentTimestamp) return;
        const secondsLeft = endTimestamp - currentTimestamp;
        setSecondsLeft(() => secondsLeft);
    };

    useEffect(() => {
        init()
    }, []);

    

    useEffect(() => {
        if (secondsLeft === undefined) return;
        if(isSet) return
        setIsSet(true)
        const intervalID = setIntervalImmediately(getTimeRemaining, 60000);
        return () => {
            clearInterval(intervalID);
        }
    }, [secondsLeft, isSet]);

    const getTimeRemaining = () => {
        if (secondsLeft === undefined) return;
        const weeksLeft = Math.floor(secondsLeft! / 604800);
        const r1 = secondsLeft % 604800;
        const daysLeft = Math.floor(r1 / 86400);
        const r2 = r1 % 86400;
        const hoursLeft = Math.floor(r2 / 3600);
        const r3 = r2 % 3600;
        const minutesLeft = Math.floor(r3 / 60);
        const time = secondsLeft - 60
        setSecondsLeft(secondsLeft - 60);
        console.log(time);
        
        setCountdown({
            weeks: weeksLeft,
            days: daysLeft,
            hours: hoursLeft,
            minutes: minutesLeft,
        });
        
    };

    return { countdown };
};
