import React from "react";

const Piece = ({img, className, id, onclick}) => {
    return (
        <button className={`${className} piece-container`} id={id} onClick={onclick} >
                <img src={img} alt="" className="piece"/>
        </button>
    )
}

export default Piece