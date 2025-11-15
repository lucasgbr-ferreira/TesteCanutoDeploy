// IMPORTS //

import React from "react";
import "../styles/HeroConcessionaria.css";
import FundoHero from "../assets/fundo_homepageConcessionaria.jpg";

// IMPORTS //


// PRINCIPAL //

export default function HeroConcessionaria({ nome }) {
  return (
    <section 
      className="hero-concessionaria"
      style={{ backgroundImage: `url(${FundoHero})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">
          Encontre seu próximo veículo com a
        </h1>

        <h1 className="hero-title-strong">
          {nome}
        </h1>

        <p className="hero-subtitle">
          Seu próximo veículo começa aqui: confiança, transparência e qualidade.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">Buscar</button>
          <button className="btn-secondary">Explorar</button>
        </div>
      </div>
    </section>
  );
}

// PRINCIPAL //