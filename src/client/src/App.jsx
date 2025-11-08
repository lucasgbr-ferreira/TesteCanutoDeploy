// client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PerfilCliente from "./pages/PerfilCliente";

import { motion } from "framer-motion";
import GalleryScroll from "./components/GalleryScroll";
import "./styles/landing.css";
import "./styles/gallery.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay }
  })
};

function LandingPage() {
  return (
    <main className="lp-root">
      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-container lp-hero-grid">
          <div className="lp-hero-left">
            <motion.h1
              className="lp-hero-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0}
            >
              Encontre o carro perfeito — ofertas exclusivas na sua região
            </motion.h1>

            <motion.p
              className="lp-hero-sub"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0.12}
            >
              Catálogo atualizado, financiamento integrado e atendimento direto das concessionárias.
            </motion.p>

            <motion.div
              className="lp-hero-cta"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0.24}
            >
              <a href="/catalog" className="btn primary large">Ver catálogo</a>
              <a href="/register" className="btn ghost large">Criar conta</a>
            </motion.div>
          </div>

          <motion.div
            className="lp-hero-right"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="lp-hero-card">
              <div className="lp-car-visual">🚘</div>
              <div className="lp-car-info">
                <h3>Novidade: Hatch X200</h3>
                <p>Entrada facilitada — parcelas a partir de R$799</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-features">
        <div className="lp-container">
          <div className="lp-features-grid">
            <article className="lp-feature-card">
              <div className="lp-feature-ico">★</div>
              <h4>Filtros avançados</h4>
              <p>Busque por preço, ano, cidade e muito mais.</p>
            </article>
            <article className="lp-feature-card">
              <div className="lp-feature-ico">★</div>
              <h4>Credenciamento rápido</h4>
              <p>Cadastro simplificado para clientes e concessionárias.</p>
            </article>
            <article className="lp-feature-card">
              <div className="lp-feature-ico">★</div>
              <h4>Painel de gestão</h4>
              <p>Acompanhe propostas, agendamentos e métricas.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="lp-about">
        <div className="lp-container">
          <h3>Como funciona</h3>
          <p>
            Conectamos clientes às concessionárias próximas, facilitamos propostas e agendamentos, e apresentamos opções de pagamento e garantia — tudo numa única plataforma.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <GalleryScroll />

      {/* CTA */}
      <section className="lp-cta" id="cadastro">
        <div className="lp-container">
          <div className="lp-cta-inner">
            <h3>Pronto para encontrar seu próximo carro?</h3>
            <p>Crie sua conta e comece a pesquisar no catálogo agora mesmo.</p>
            <div style={{ marginTop: 12 }}>
              <a href="/register" className="btn primary">Criar Conta</a>
              <a href="/catalog" className="btn ghost">Ver catálogo</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-container">
          <small>© {new Date().getFullYear()} GesCar — Conectando pessoas e concessionárias</small>
        </div>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<PerfilCliente />} />

        <Route path="/landing" element={<LandingPage />} />

      </Routes>
    </Router>
  );
}
