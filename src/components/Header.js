import React from "react";
import headerImg from '../images/logo.svg';

const Header = ({allStates}) => {
    return (
        <div className="header-container">
            <img src={headerImg} alt="" className="header-img" />
            <div className="score-container">
                <span className="score-label">SCORE</span>
                <span className="score">{allStates.score}</span>
            </div>
        </div>
    )
}

export default Header;