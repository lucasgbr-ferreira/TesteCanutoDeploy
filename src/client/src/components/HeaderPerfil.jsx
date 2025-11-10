import React from "react";
import "../styles/landing.css";
import Logo from "../assets/GesCar-Logo-removebg-preview.png"; 

export default function HeaderCliente() {
  return (
    <header className="lp-header">
      <div className="lp-brand">
        <a href="/home_cliente">
          <img src={Logo} alt="GesCar" className="lp-logo" />
        </a>
      </div>

      <nav className="lp-nav" style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <a href="/home_cliente">Início</a>
        <a href="#">Veículos</a>
        <a href="#">Promoções</a>
        <a href="/perfil">Perfil</a>

        <div style={{ marginLeft: "18px" }}>
          <button className="lp-button-logout">Sair</button>
        </div>
      </nav>
    </header>
  );
}
