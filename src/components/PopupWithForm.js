import React from 'react';

function PopupWithForm(props) {
	return (
		<section
			className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''
				}`}
		>
			<div className="popup__container">
				<button
					className="popup__close"
					type="button"
					aria-label="Закрыть"
					onClick={props.onClose}
				></button>
				<form
					className={`popup__form popup__form_type_${props.name}`}
					name={`${props.name}-form`}
				>
					<h2 className="popup__title">{props.title}</h2>
					{props.children}
					<button
						className="popup__submit-button"
						type="submit">
						{props.textButton}
					</button>
				</form>
			</div>
		</section>
	)
}

export default PopupWithForm
