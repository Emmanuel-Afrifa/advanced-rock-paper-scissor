import React from "react";
import rock from '../images/icon-rock.svg';
import paper from '../images/icon-paper.svg';
import scissors from '../images/icon-scissors.svg';
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

    return (
        <div className="game-start-container">
            <Piece 
                img={paper} 
                className="paper-container" 
                id="paper-ele" 
                onclick={pieceClicked}
            />
            <Piece 
                img={scissors} 
                className="scissors-container" 
                id="scissors-ele"
                onclick={pieceClicked}
            />
            <Piece 
                img={rock} 
                className="rock-container" 
                id="rock-ele"
                onclick={pieceClicked}
            />
        </div>
    )
}

export default GamePieces