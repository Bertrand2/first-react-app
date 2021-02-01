import React, {useState, useEffect} from "react";

import Display from "./display";
import Button from "./button";
import LoadingBar from "./loading-bar";

const Timer = () => {
    const defaultTime = 300;
    const [maxTime, setMaxTime] = useState(defaultTime);
    const [remainingTime, setRemainingTime] = useState(defaultTime);
    const [status, setStatus] = useState("reset");
    let buttonContent;
    const loadingBar = {
        size: 32,
        width: 2,
    };

    if (status === "play") {
        buttonContent = "Pause";
    } else if (status === "pause") {
        buttonContent = "Resume";
    } else {
        buttonContent = "Play";
    }

    const renderArc = (size, width) => {
        const radius = size / 2;
        const center = radius + width;
        const angle = 2 * Math.PI * (remainingTime / (maxTime + 0.01));
        return [
            "M",
            center,
            width,
            "A",
            radius,
            radius,
            0,
            angle > Math.PI ? 1 : 0,
            1,
            center + Math.cos(Math.PI / 2 - angle) * radius,
            center - Math.sin(Math.PI / 2 - angle) * radius,
        ].join(" ");
    };
    const decrementTime = () => {
        remainingTime && setRemainingTime(remainingTime - 1);
    };
    const timerStartStop = () => {
        if (status === "pause" || status === "reset") {
            setStatus("play");
        } else {
            setStatus("pause");
        }
    };
    const timerReset = () => {
        setRemainingTime(maxTime);
        setStatus("reset");
    };
    const timerAugment = () => {
        if (status === "pause") {
            setRemainingTime(remainingTime + 60);
        } else if (status === "reset") {
            setMaxTime(maxTime + 60);
            setRemainingTime(remainingTime + 60);
        }
    };
    const timerReduce = () => {
        if (status === "pause" && remainingTime >= 60) {
            setRemainingTime(remainingTime - 60);
        } else if (status === "reset" && maxTime >= 60) {
            setMaxTime(maxTime - 60);
            setRemainingTime(remainingTime - 60);
        }
    };

    useEffect(() => {
        let timerInterval;
        if (status === "play") {
            timerInterval = setInterval(decrementTime, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [status, remainingTime]);

    return (
        <div className={"pomodoro"}>
            <Display time={status === "reset" ? maxTime : remainingTime} />
            <ul className={"pomodoro__list"}>
                <li className={"pomodoro__item"}>
                    <Button
                        onClick={timerReduce}
                        disabled={status === "play" ? true : false}
                        large={false}
                        content={"-"}
                    />
                </li>
                <li className={"pomodoro__item"}>
                    <Button
                        onClick={timerStartStop}
                        disabled={false}
                        large={true}
                        content={buttonContent}
                    />
                </li>
                <li className={"pomodoro__item"}>
                    <Button
                        onClick={timerReset}
                        disabled={false}
                        large={true}
                        content={"Reset"}
                    />
                </li>
                <li className={"pomodoro__item"}>
                    <Button
                        onClick={timerAugment}
                        disabled={status === "play" ? true : false}
                        large={false}
                        content={"+"}
                    />
                </li>
            </ul>
            <LoadingBar
                arc={renderArc(loadingBar.size, loadingBar.width)}
                size={loadingBar.size}
                width={loadingBar.width}
            />
        </div>
    );
};

export default Timer;
