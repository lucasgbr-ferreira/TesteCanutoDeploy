// Imports // 

import React, { useState } from "react";
import "../styles/HComprasCliente.css"
import FundoHCliente from "../assets/FundoHCliente.png"


// Imports // 

export default function HeroHCliente({ nome }) {
    return (
      <section 
            className="hero-concessionaria"
            style={{ backgroundImage: `url(${FundoHCliente})` }}
          >
            <div className="hero-overlay"></div>
      
            <div className="hero-content">
              <h1 className="hero-title">
                Bem vindo, ao seu histórico de compras
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