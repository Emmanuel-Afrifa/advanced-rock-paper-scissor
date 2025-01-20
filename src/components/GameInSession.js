import React from "react";
import Piece from "./Piece";
import rock from '../images/icon-rock.svg';
import paper from '../images/icon-paper.svg';
import scissors from '../images/icon-scissors.svg';
import spock from '../images/icon-spock.svg';
import lizard from '../images/icon-lizard.svg';
import ResultDisplay from "./ResultDisplay";

const GameInSession = ({allStates, setStates}) => {
    const winnerClass = React.useRef('');

    const selectedCPUPiece = React.useRef(null)

    const checkWin = (player, cpu) => {
        if ((player === 'paper' && cpu === 'scissors') || (player === 'scissors' && cpu === 'paper')){
            return 'scissors';
        }
        else if ((player === 'paper' && cpu === 'rock') || (player === 'rock' && cpu === 'paper')){
            return 'paper';
        }
        else if ((player === 'rock' && cpu === 'scissors') || (player === 'scissors' && cpu === 'rock')){
            return 'rock';
        }
        else if ((player === 'spock' && cpu === 'scissors') || (player === 'scissors' && cpu === 'spock')){
            return 'spock';
        }
        else if ((player === 'lizard' && cpu === 'spock') || (player === 'spock' && cpu === 'lizard')){
            return 'lizard';
        }
        else if ((player === 'rock' && cpu === 'lizard') || (player === 'lizard' && cpu === 'rock')){
            return 'rock';
        }
        else if ((player === 'lizard' && cpu === 'scissors') || (player === 'scissors' && cpu === 'lizard')){
            return 'scissors';
        }
        else if ((player === 'rock' && cpu === 'spock') || (player === 'spock' && cpu === 'rock')){
            return 'spock';
        }
        else if ((player === 'lizard' && cpu === 'paper') || (player === 'paper' && cpu === 'lizard')){
            return 'lizard';
        }
        else if ((player === 'spock' && cpu === 'paper') || (player === 'paper' && cpu === 'spock')){
            return 'paper';
        }
        else {
            return 'draw'
        }
    }

    const piecesObj = React.useMemo(() => (
        {
            'paper': {
                img: paper,
                className: allStates.expertMode ? 'paper-container-expert' : 'paper-container',
                id: allStates.expertMode ? 'piece-paper-expert' : 'piece-paper'
            },
            'scissors': {
                img: scissors,
                className: allStates.expertMode ? 'scissors-container-expert' : 'scissors-container',
                id: allStates.expertMode ? 'piece-scissors-expert' : 'piece-scissors'
            },
            'rock': {
                img: rock,
                className: allStates.expertMode ? 'rock-container-expert' : 'rock-container',
                id: allStates.expertMode ? 'piece-rock-expert' : 'piece-rock'
            },
            'spock': {
                img: spock,
                className: allStates.expertMode ? 'spock-container-expert' : 'rock-container',
                id: allStates.expertMode ? 'piece-spock-expert' : 'piece-rock'
            },
            'lizard': {
                img: lizard,
                className: allStates.expertMode ? 'lizard-container-expert' : 'rock-container',
                id: allStates.expertMode ? 'piece-lizard-expert' : 'piece-rock'
            }
        }
    ), [allStates.expertMode])

    const selectedPlayerPiece = piecesObj[allStates.playerChose];


    const pickCPUPiece = React.useCallback(() => {
        const numPieces  = allStates.expertMode ? 5 : 3

        const pieces = Object.keys(piecesObj);
        return pieces[Math.floor(Math.random()*numPieces)];
    }, [piecesObj, allStates.expertMode])


    

    React.useEffect(() => {
        if (allStates.cpuPlayed){
            return;
        }

        const cpuChoice = pickCPUPiece();
        selectedCPUPiece.current = piecesObj[cpuChoice];

        const timer = setTimeout(() => {
            setStates({
                ...allStates,
                cpuPlayed: true,
                cpuChose: cpuChoice
            });

        }, 1000);
    
        return () => clearTimeout(timer);
    }, [allStates, pickCPUPiece, piecesObj, setStates]);

    React.useEffect(() => {
        if (allStates.cpuChose) {

            if (allStates.gameComplete) return;

            const gameStatus = checkWin(allStates.playerChose, allStates.cpuChose);
            if (gameStatus === allStates.playerChose) {
                const newScore = allStates.score + 1
                setStates((prevStates) => ({
                    ...prevStates,
                    winMessage: "You Win",
                    score: newScore,
                    gameComplete: true
                }));
                winnerClass.current = 'player'
                localStorage.setItem("score", newScore);
            } 
            else if (gameStatus === allStates.cpuChose) {
                // const newLoseScore = allStates.score === 0 ? 0 : allStates.score - 1 
                const newScore = Math.max(0, allStates.score - 1)
                setStates((prevStates) => ({
                    ...prevStates,
                    winMessage: "You Lose",
                    score: Math.max(0, prevStates.score - 1),
                    gameComplete: true
                }));
                localStorage.setItem("score", newScore);
                winnerClass.current = 'cpu'
            } else if (gameStatus === "draw") {
                setStates((prevStates) => ({
                    ...prevStates,
                    winMessage: "Draw",
                    score: prevStates.score,
                    gameComplete: true
                }));
            }
        }
    }, [allStates.cpuChose,allStates.gameComplete, allStates.playerChose, allStates.score, setStates]);
    
    


    return (
        <div className="game-in-session-container">
            <div className="player-option">
                <Piece 
                    img={selectedPlayerPiece.img} 
                    className={winnerClass.current === 'player'? selectedPlayerPiece.className + ' winner' : selectedPlayerPiece.className} 
                    id={selectedPlayerPiece.id}
                />
                <p className="description">YOU PICKED</p>
            </div>
            <div className="cpu-option">
                {
                    allStates.cpuPlayed ? 
                    <Piece 
                        img={selectedCPUPiece.current.img} 
                        className={winnerClass.current === 'cpu' ? selectedCPUPiece.current.className + ' winner' : selectedCPUPiece.current.className} 
                        id={selectedCPUPiece.current.id}
                    /> :
                    <div className="empty-cpu"></div>
                
                }
                <p className="description">THE HOUSE PICKED</p>
            </div>
            {
                allStates.cpuPlayed && <ResultDisplay allStates={allStates} setStates={setStates} />
            }
        </div>
    )
}

export default GameInSession;