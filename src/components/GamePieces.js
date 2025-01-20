import React from "react";
import rock from '../images/icon-rock.svg';
import paper from '../images/icon-paper.svg';
import scissors from '../images/icon-scissors.svg';
import spock from '../images/icon-spock.svg';
import lizard from '../images/icon-lizard.svg';
import Piece from "./Piece";


const GamePieces = ({allStates, setStates}) => {

    const pieceClicked = (event) => {
        // console.log('hi')
        let chosenPiece = '';
        // console.log(event.target.className.split('-'))
        if (event.target.children.length === 0){
            chosenPiece = event.target.parentElement.className.split('-')[0]
        }
        else if (event.target.children.length > 0){
            chosenPiece = event.target.className.split('-')[0]
        }

        setStates(
            {
                ...allStates,
                playerChose: chosenPiece,
                playStarted: true
            }
        )
    }

    const containerClass = allStates.expertMode ? 'game-start-container-expert' : 'game-start-container';
    const paperClass = allStates.expertMode ? 'paper-container-expert' : 'paper-container';
    const paperId = allStates.expertMode ? 'paper-ele-expert' : 'paper-ele';
    const scissorsClass = allStates.expertMode ? 'scissors-container-expert' : 'scissors-container';
    const scissorsId = allStates.expertMode ? 'scissors-ele-expert' : 'scissors-ele';
    const rockClass = allStates.expertMode ? 'rock-container-expert' : 'rock-container';
    const rockId = allStates.expertMode ? 'rock-ele-expert' : 'rock-ele'


    return (
        <div className={containerClass}>
            <Piece 
                img={paper} 
                className={paperClass} 
                id={paperId} 
                onclick={pieceClicked}
                // allStates={allStates}
            />
            <Piece 
                img={scissors} 
                className={scissorsClass} 
                id={scissorsId}
                onclick={pieceClicked}
                // allStates={allStates}
            />
            <Piece 
                img={rock} 
                className={rockClass} 
                id={rockId}
                onclick={pieceClicked}
                // allStates={allStates}
            />
            {
                allStates.expertMode && 
                <Piece 
                    img={spock} 
                    className="spock-container-expert" 
                    id="spock-ele-expert"
                    onclick={pieceClicked}
                    // allStates={allStates}
                />
            }
            {
                allStates.expertMode && 
                <Piece 
                    img={lizard} 
                    className="lizard-container-expert" 
                    id="lizard-ele-expert"
                    onclick={pieceClicked}
                    // allStates={allStates}
                />
            }
        </div>
    )
}

export default GamePieces