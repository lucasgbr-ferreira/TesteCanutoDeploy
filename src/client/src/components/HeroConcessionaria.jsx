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
          Bem vindo, ao seu painel de gestor da
        </h1>

        <h1 className="hero-title-strong">
          {nome}
        </h1>

        <div className="hero-buttons">
          <button className="btn-primary">Catálogo De Veíuclos</button>
        </div>
      </div>
    </section>
  );
}

// PRINCIPAL //