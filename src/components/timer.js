import React, {useState, useEffect} from "react";

import Display from "./display";
import Button from "./button";
import LoadingBar from "./loading-bar";

import fileAudioWork from "../assets/workTime.wav";
import fileAudioBreak from "../assets/breakTime.wav";
import fileAudioEnd from "../assets/end.wav";

const audioWork = new Audio(fileAudioWork);
const audioBreak = new Audio(fileAudioBreak);
const audioEnd = new Audio(fileAudioEnd);

const Timer = () => {
    const defaultWorkTime = 1500;
    const defaultBreakTime = 300;
    const defaultCycles = 3;
    const defaultTime = (defaultWorkTime + defaultBreakTime) * defaultCycles;
    const [workTime, setWorkTime] = useState(defaultWorkTime);
    const [breakTime, setBreakTime] = useState(defaultBreakTime);
    const [cycles, setCycles] = useState(defaultCycles);
    const [maxTime, setMaxTime] = useState(defaultTime);
    const [remainingTime, setRemainingTime] = useState(defaultTime);
    const [status, setStatus] = useState("reset");
    const [workStatus, setWorkStatus] = useState("Work  Time !");
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
        const angle =
            remainingTime > maxTime
                ? 2 * Math.PI - 0.001
                : 2 * Math.PI * (remainingTime / (maxTime + 0.01));
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
        if (status === "pause" && remainingTime > 60) {
            setRemainingTime(remainingTime - 60);
        } else if (status === "reset" && maxTime > 60) {
            setMaxTime(maxTime - 60);
            setRemainingTime(remainingTime - 60);
        }
    };
    const workTimeAugment = () => {
        if (status === "reset") {
            setWorkTime(workTime + 60);
        }
    };
    const workTimeReduce = () => {
        if (status === "reset" && workTime > 60) {
            setWorkTime(workTime - 60);
        }
    };
    const breakTimeAugment = () => {
        if (status === "reset") {
            setBreakTime(breakTime + 60);
        }
    };
    const breakTimeReduce = () => {
        if (status === "reset" && breakTime > 60) {
            setBreakTime(breakTime - 60);
        }
    };
    const cyclesAugment = () => {
        if (status === "reset") {
            setCycles(cycles + 1);
        }
    };
    const cyclesReduce = () => {
        if (status === "reset" && cycles > 1) {
            setCycles(cycles - 1);
        }
    };
    const decrementTime = () => {
        remainingTime && setRemainingTime(remainingTime - 1);
        setWorkStatus(
            (remainingTime - 1) % (breakTime + workTime) <= breakTime
                ? "Break  Time !"
                : "Work  Time !",
        );
        if (remainingTime === 0) {
            audioEnd.play();
            timerReset();
        } else if (remainingTime % (breakTime + workTime) === breakTime) {
            audioBreak.play();
        } else if (remainingTime % (breakTime + workTime) === 0) {
            audioWork.play();
        }
    };

    useEffect(() => {
        let timerInterval;
        if (status === "play") {
            timerInterval = setInterval(decrementTime, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [status, remainingTime]);

    useEffect(() => {
        setRemainingTime((workTime + breakTime) * cycles);
        setMaxTime((workTime + breakTime) * cycles);
    }, [workTime, breakTime, cycles]);

    return (
        <>
            <div className={"pomodoro"}>
                <Display time={status === "reset" ? maxTime : remainingTime} />
                <ul className={"pomodoro__list"}>
                    <li className={"pomodoro__item"}>
                        <Button
                            onClick={timerAugment}
                            disabled={status === "pause" ? false : true}
                            large={false}
                            content={"◀◀"}
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
                            disabled={status === "reset" ? true : false}
                            large={true}
                            content={"Reset"}
                        />
                    </li>
                    <li className={"pomodoro__item"}>
                        <Button
                            onClick={timerReduce}
                            disabled={status === "pause" ? false : true}
                            large={false}
                            content={"▶▶"}
                        />
                    </li>
                </ul>
                <h2 className={"pomodoro__work-status"}>{workStatus}</h2>
                <LoadingBar
                    arc={renderArc(loadingBar.size, loadingBar.width)}
                    size={loadingBar.size}
                    width={loadingBar.width}
                />
            </div>
            <div className={"panel"}>
                <ul className={"panel__list"}>
                    <li className={"panel__button"}>
                        <Button
                            onClick={workTimeReduce}
                            disabled={status === "reset" ? false : true}
                            large={false}
                            content={"-"}
                        />
                    </li>
                    <li className={"panel__content"}>
                        <p className={"panel__text"}>
                            {"Work  time : "}
                            {Math.floor(workTime / 60)}
                        </p>
                    </li>
                    <li className={"panel__button"}>
                        <Button
                            onClick={workTimeAugment}
                            disabled={status === "reset" ? false : true}
                            large={false}
                            content={"+"}
                        />
                    </li>
                </ul>
                <ul className={"panel__list"}>
                    <li className={"panel__button"}>
                        <Button
                            onClick={breakTimeReduce}
                            disabled={status === "reset" ? false : true}
                            large={false}
                            content={"-"}
                        />
                    </li>
                    <li className={"panel__content"}>
                        <p className={"panel__text"}>
                            {"Break  time : "}
                            {Math.floor(breakTime / 60)}
                        </p>
                    </li>
                    <li className={"panel__button"}>
                        <Button
                            onClick={breakTimeAugment}
                            disabled={status === "reset" ? false : true}
                            large={false}
                            content={"+"}
                        />
                    </li>
                </ul>
                <ul className={"panel__list"}>
                    <li className={"panel__button"}>
                        <Button
                            onClick={cyclesReduce}
                            disabled={status === "reset" ? false : true}
                            large={false}
                            content={"-"}
                        />
                    </li>
                    <li className={"panel__content"}>
                        <p className={"panel__text"}>
                            {"Cycles : "}
                            {cycles}
                        </p>
                    </li>
                    <li className={"panel__button"}>
                        <Button
                            onClick={cyclesAugment}
                            disabled={status === "reset" ? false : true}
                            large={false}
                            content={"+"}
                        />
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Timer;
