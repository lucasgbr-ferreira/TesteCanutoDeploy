import React from "react";
import { motion } from "framer-motion";
import "../styles/landing.css"; 

export default function Navbar() {
  return (
    <motion.nav
      className="lp-navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="lp-container navbar-inner">
        <div className="lp-logo">
          <span>GesCar</span>
        </div>

        <ul className="lp-nav-links">
          <li><a href="#equipe">Equipe</a></li>
          <li><a href="https://github.com/seu-repo" target="_blank" rel="noopener noreferrer">Repositório</a></li>
          <li><a href="/catalog">Catálogo</a></li>
          <li><a href="/register" className="btn small">Criar conta</a></li>
        </ul>
      </div>
    </motion.nav>
  );
}
