// Imports // 

import React, { useState } from "react";
import "../styles/HComprasCliente.css"

// Imports // 

export default function HComprasCliente() {
    return (
        <section className="fc-section">
            <div className="fc-container">
                <p className="lp-destaque-tag">Compras</p>
                <h2 className="lp-destaque-title">Veículos Adquiridos</h2>
                <p className="lp-destaque-desc">
                    Confira cada veículo comprado por você na CanutoMotors
                </p>
            </div>
        </section>
    );
}