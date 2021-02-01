import React from "react";

const Display = ({time}) => (
    <p className={"pomodoro__display"}>
        {`0${Math.floor(time / 60)}`.slice(-2)}
        {":"}
        {`0${time % 60}`.slice(-2)}
    </p>
);

export default Display;
