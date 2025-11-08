import React from "react";
import "../styles/perfil.css";

export default function Header() {
  return (
    <header className="header-cliente">
      {/* LOGO */}
      <div className="logo">
        <span className="logo-text">Ges</span>
        <span className="logo-highlight">Car</span>
      </div>

      {/* MENU CENTRAL */}
      <nav className="nav-menu">
        <a href="#">Início</a>
        <span className="separator">|</span>
        <a href="#">Veículos</a>
        <span className="separator">|</span>
        <a href="#">Promoções</a>
        <span className="separator">|</span>
        <a href="#">Perfil</a>
      </nav>

      {/* BOTÃO SAIR */}
      <button className="btn-logout">Sair</button>
    </header>
  );
}
