import React, {useEffect}  from 'react';

function PopupWithForm(props) {
	//Закрываем попапы по кнопке Escape 
useEffect(() => {
  function onCloseEsc(evt) {
    if (evt.key ==='Escape') {
      props.onClose();
    }
  }
if (props.isOpen) {
      document.addEventListener('keydown', onCloseEsc);
    } else {
      document.removeEventListener('keydown', onCloseEsc);
    };
  }, [props.isOpen])

  // Закрываем попапы по  клику на Overlay   
  useEffect(() => {
    function onCloseOverlay(evt) {
      if (evt.target.classList.contains('popup_opened')) {
		props.onClose();     }
   }
  if (props.isOpen) {
        document.addEventListener('mousedown', onCloseOverlay);
      } else {
        document.removeEventListener('mousedown', onCloseOverlay);
      };
    }, [props.isOpen])
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
					onSubmit={props.onSubmit}
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
