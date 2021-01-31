import React from "react";

const Button = ({disabled, content, onClick: handleClick}) => (
    <button
        type={"button"}
        onClick={handleClick}
        className={"pomodoro__button"}
        disabled={disabled}>
        {content}
    </button>
);

export default Button;
