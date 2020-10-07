import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__content">
      <img className="header__logo" src={headerLogo} alt="места России" />
    </header>
  );
}

export default Header;
