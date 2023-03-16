
function ImagePopup({ card, onClose }) {
	return (
		<section className={`popup popup_type_preview ${card && 'popup_opened'}`}>
			<div className="popup popup__preview-container">
				<button type="button" className="popup__close popup__close_type-preview" onClick={onClose}></button>
				<img className="popup__preview-image" src={card && card.link} alt={card && card.name} />
				<h2 className="popup__preview-title">{card && card.name}</h2>
			</div>
		</section >
	);
};

export default ImagePopup;