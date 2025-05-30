import React, { useState } from "react";

const Box = ({ id, value, onOpen }) => {
    const [opened, setOpened] = useState(false);

    const handleClick = () => {
        if (!opened) {
            setOpened(true);
            onOpen(id, value);
        }
    };

    return (
        <div className={`box ${opened ? "opened" : ""}`} onClick={handleClick}>
            {opened ? <p>🎁 {value}€</p> : <p>Pacco #{id}</p>}
        </div>
    );
};

export default Box;

