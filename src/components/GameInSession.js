import React from "react";
import Piece from "./Piece";
import rock from '../images/icon-rock.svg';
import paper from '../images/icon-paper.svg';
import scissors from '../images/icon-scissors.svg';
import ResultDisplay from "./ResultDisplay";

const GameInSession = ({allStates, setStates}) => {
    const selectedCPUPiece = React.useRef(null)

    const checkWin = (player, cpu) => {
        console.log(player, cpu)
        if ((player === 'paper' && cpu === 'scissors') || (player === 'scissors' && cpu === 'paper')){
            return 'scissors';
        }
        if ((player === 'paper' && cpu === 'rock') || (player === 'rock' && cpu === 'paper')){
            return 'paper';
        }
        if ((player === 'rock' && cpu === 'scissors') || (player === 'scissors' && cpu === 'rock')){
            return 'rock';
        }
        else {
            return 'draw'
        }
    }

    const piecesObj = {
        'paper': {
            img: paper,
            className: 'paper-container',
            id: 'piece-paper'
        },
        'scissors': {
            img: scissors,
            className: 'scissors-container',
            id: 'piece-scissors'
        },
        'rock': {
            img: rock,
            className: 'rock-container',
            id: 'piece-rock'
        }

    }

    const selectedPlayerPiece = piecesObj[allStates.playerChose];


    const pickCPUPiece = () => {
        const pieces = Object.keys(piecesObj);
        return pieces[Math.floor(Math.random()*2)];
    }


    

    React.useEffect(() => {
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
    }, []);

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
            } else if (gameStatus === "draw") {
                setStates((prevStates) => ({
                    ...prevStates,
                    winMessage: "Draw",
                    score: prevStates.score,
                    gameComplete: true
                }));
            }
        }
      }, [allStates.cpuChose]);
    

    return (
        <div className="game-in-session-container">
            <div className="player-option">
                <Piece 
                    img={selectedPlayerPiece.img} 
                    className={selectedPlayerPiece.className} 
                    id={selectedPlayerPiece.id}
                />
                <p className="description">YOU PICKED</p>
            </div>
            <div className="cpu-option">
                {
                    allStates.cpuPlayed ? 
                    <Piece 
                        img={selectedCPUPiece.current.img} 
                        className={selectedCPUPiece.current.className} 
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