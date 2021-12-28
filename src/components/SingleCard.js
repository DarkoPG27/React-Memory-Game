import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled, turns }) {

    const handleClick = () => {
        if (!disabled && (turns > 0)) {
            handleChoice(card)
        }
    }
    return (

        <div className="card" >
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <img
                    className="back"
                    src="/img/card-cover.jpg"
                    onClick={handleClick}
                    alt="card back"
                />
            </div>
        </div>

    )
}
