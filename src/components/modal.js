import React from "react";

import Button from "./button";

const Modal = ({active, onClickDismiss, onClickRestart}) => (
    <div className={`modal ${active ? "active" : ""}`} onClick={onClickDismiss}>
        <div className={"modal__panel"}>
            <div className={"modal__panel-inner"}>
                <p className={"modal__content"}>{"Time is up !"}</p>
                <ul className={"modal__list"}>
                    <li className={"modal__item"}>
                        <Button
                            disabled={false}
                            large={true}
                            content={"Dismiss"}
                            onClick={onClickDismiss}
                        />
                    </li>
                    <li className={"modal__item"}>
                        <Button
                            disabled={false}
                            large={true}
                            content={"Restart"}
                            onClick={onClickRestart}
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

export default Modal;
