import React from "react";

const Display = ({time}) => (
    <p className={"pomodoro__display"}>
        {Math.floor(time / 60) >= 10
            ? Math.floor(time / 60)
            : `0${Math.floor(time / 60)}`}
        {":"}
        {`${time % 60}`.padStart(2, "0")}
    </p>
);

export default Display;
