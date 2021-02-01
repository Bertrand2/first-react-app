import React from "react";

const Button = ({disabled, large, content, onClick: handleClick}) => (
    <button
        type={"button"}
        onClick={handleClick}
        className={`pomodoro__button ${large ? "large" : ""}`}
        disabled={disabled}>
        {content}
    </button>
);

export default Button;
