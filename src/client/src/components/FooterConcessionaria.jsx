import React from "react";
import "../styles/FooterConcessionaria.css";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function FooterConcessionaria( { nome } ) {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-logo">
          <img src="/canutomotors_logo.png" alt="logo concessionaria" />
        </div>

        <nav className="footer-nav">
          <a href="#">Início</a>
          <a href="#">Veículos</a>
          <a href="#">Promoções</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </nav>

        <div className="footer-social">
          <a href="#"><Facebook size={20} /></a>
          <a href="#"><Instagram size={20} /></a>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p>© 2024 {nome}. Todos os direitos reservados.</p>

        <div className="footer-links">
          <a href="#">Política de privacidade</a>
          <a href="#">Termos de serviço</a>
          <a href="#">Configurações de cookies</a>
        </div>
      </div>
    </footer>
  );
}