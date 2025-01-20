import React from "react";
import rulesImg from '../images/image-rules.svg';
import close from '../images/icon-close.svg';

const Rules = ({allStates, setStates}) => {

    const onClickHandler = () => {
        setStates({
            ...allStates,
            displayRules: false
        })
    }

    return (
        <section className="rules-container">
            <div className="rules-main-content">
                <h2 className="rules-header">RULES</h2>
                <img src={rulesImg} alt="rules-image" className="rules-image" />
                <button className="close-button" onClick={onClickHandler}>
                    <img src={close} alt="close-button" className="close"/>
                </button>
            </div>
        </section>
    )
}

export default Rules