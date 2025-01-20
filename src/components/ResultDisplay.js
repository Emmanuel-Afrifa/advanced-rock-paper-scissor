import React from "react";

const ResultDisplay = ({allStates, setStates}) => {


    const onClickHandler = () => {
        setStates(
            {
                ...allStates,
                displayRules: false,
                playerChose: '',
                playStarted: false,
                cpuPlayed: false,
                cpuChose: '',
                winMessage: '',
                gameComplete: false,
            }
        )
    }

    return (
        <div className="results-container">
            <h2 className="results-message">{allStates.winMessage}</h2>
            <button className="play-again-button" onClick={onClickHandler}>play again</button>
        </div>
    )
}

export default ResultDisplay;