// src/pages/Contact.jsx

import React from "react";
import "../styles/ContactConcessionaria.css";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact({ email, telefone, endereco }) {
  return (
    <section className="contact-container">
      <div className="contact-left">
        <span className="contact-section-title">Importante</span>

        <h1 className="contact-title">Informações</h1>

        <p className="contact-subtitle">
          Aqui estão algumas informações importantes sobre a concessionaria!
        </p>
      </div>

      <div className="contact-right">
        <div className="contact-item">
          <Mail className="contact-icon" />
          <div>
            <h3 className="contact-label">Email</h3>
            <a href={`mailto:${email}`} className="contact-value">{email}</a>
          </div>
        </div>

        <div className="contact-item">
          <Phone className="contact-icon" />
          <div>
            <h3 className="contact-label">Telefone</h3>
            <a href={`tel:${telefone}`} className="contact-value">{telefone}</a>
          </div>
        </div>

        <div className="contact-item">
          <MapPin className="contact-icon" />
          <div>
            <h3 className="contact-label">Endereço</h3>
            <p className="contact-value">{endereco || "Indisponível"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
