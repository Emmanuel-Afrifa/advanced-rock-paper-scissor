// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import GamePieces from './components/GamePieces';
import GameInSession from './components/GameInSession';
import RulesButton from './components/RulesButton';
import Rules from './components/Rules';
import React from 'react';

function App() {
    // const storedScore = React.useRef(0);
    // let score = null;

    // React.useEffect(() => {
    //     storedScore.current = localStorage.getItem("score");
    // })

 
    // score = storedScore.current ? parseInt(storedScore.current, 10) : 0;
    // console.log(score)

    const [allStates, setAllStates] = React.useState({
        displayRules: false,
        playerChose: '',
        playStarted: false,
        cpuPlayed: false,
        cpuChose: '',
        winMessage: '',
        score: 0,
        gameComplete: false
    })

    // console.log(allStates)

    return (
        <div className="App">
            <Header allStates={allStates}/>
            {
                allStates.playStarted ? 
                <GameInSession allStates={allStates} setStates={setAllStates} /> :
                <GamePieces allStates={allStates} setStates={setAllStates} />
            }
            <RulesButton allStates={allStates} setStates={setAllStates} />

            { allStates.displayRules && <Rules allStates={allStates} setStates={setAllStates}/>}
        </div>
    );
}

export default App;
