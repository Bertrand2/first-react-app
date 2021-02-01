import React from "react";

const Title = () => {
    const smash = () => {
        window.document.querySelector("h1.title").classList.add("smashed");
    };
    return (
        <h1 className={"title"} onClick={smash}>
            {"Retromodoro"}
        </h1>
    );
};

export default Title;
