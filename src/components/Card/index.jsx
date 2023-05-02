import './cardStyles.css';
const Card = ({ handleClick, image, showCard }) => {
    return (
      // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
      <div className="card-container" onClick={handleClick}>
        {showCard && <img src={image.url} alt={image.uuid} className='card-image' />}
      </div>
    );
};

export default Card;