import React from "react";

const Piece = ({img, className, id, onclick}) => {

    
    const additionalClass = className.split('-').includes('expert') ? 'piece-container-expert' : 'piece-container';

    return (
    <button className={`${className} ${additionalClass}`} id={id} onClick={onclick} >
                <img src={img} alt="" className="piece"/>
        </button>
    )
}

// Clear all states and reevaluate logic

export default Piece