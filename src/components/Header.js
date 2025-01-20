import React from "react";
import headerImg from '../images/logo.svg';

const Header = ({allStates}) => {
    return (
        <div className="header-container">
            <img src={headerImg} alt="" className="header-img" />
            <div className="score-container">
                <p className="score-label">SCORE</p>
                <p className="score">{allStates.score}</p>
            </div>
        </div>
    )
}

export default Header;