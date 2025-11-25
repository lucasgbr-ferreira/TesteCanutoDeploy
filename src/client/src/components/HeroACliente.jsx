// Imports // 

import React, { useState } from "react";
import "../styles/HComprasCliente.css"
import FundoHCliente from "../assets/testdrive.jpg"


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
                Bem Vindo 
                    <p className="hero-title-strong"> {nome}</p>
                 Explore seus testes drivers na
              </h1>
      
              <h1 className="hero-title-strong">
                CanutoMotors
              </h1>
              
      
              <div className="hero-buttons">
                <button className="btn-primary">teste</button>
              </div>
            </div>
          </section>  
    );
}