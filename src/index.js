import React from "react";
import {render} from "react-dom";

import Timer from "./components/timer";
import Title from "./components/title";

render(
    <Timer initStatus={"reset"} />,
    document.querySelector("#pomodoro-holder"),
);
render(<Title />, document.querySelector("#header"));
