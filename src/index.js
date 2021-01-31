import React from "react";
import {render} from "react-dom";

import Timer from "./components/timer";

render(
    <Timer initStatus={"reset"} />,
    document.querySelector("#pomodoro-holder"),
);
