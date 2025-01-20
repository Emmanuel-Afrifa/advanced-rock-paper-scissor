import React from "react";
// import Rules from "./Rules";

const RulesButton = ({allStates, setStates}) => {
    const onClickHandler = () => {
        setStates({
            ...allStates,
            displayRules: true
        })
        // console.log(allStates)
    }

    

    return (
        <button className="rules-button" onClick={onClickHandler}>RULES</button>
    )
}

export default RulesButton;