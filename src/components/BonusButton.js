import React from "react";

const BonusButton = ({allStates, setStates}) => {
    const onClickHandler = () => {
        const eMode = allStates.expertMode;

        setStates({
            ...allStates,
            expertMode: !eMode,
        })
        // console.log(allStates)
    }

    const btText = allStates.expertMode ? 'BASIC' : 'EXPERT';

    return (
        <button className="bonus-button" onClick={onClickHandler}>{btText}</button>
    )
}

export default BonusButton;