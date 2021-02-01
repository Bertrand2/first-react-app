import React from "react";

const LoadingBar = ({arc, size, width}) => (
    <svg
        className={"pomodoro__loading-bar"}
        width={size + 2 * width}
        height={size + 2 * width}
        viewBox={`0 0 ${size + 2 * width} ${size + 2 * width}`}
        fill={"none"}
        strokeWidth={"2"}
        strokeLinejoin={"round"}>
        <path d={arc} />
    </svg>
);

export default LoadingBar;
