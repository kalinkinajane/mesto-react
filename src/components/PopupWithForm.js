import React from 'react';
function PopupWithForm({
  title, name,
  children, button, isOpen, onClose
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen}`}>
      <div className="popup__conteiner">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" name={name} noValidate>
          {children}
          <button className="popup__button" type="submit">{button}</button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;