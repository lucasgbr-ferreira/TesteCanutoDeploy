import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PerfilCliente from "./pages/PerfilCliente";

import { motion } from "framer-motion";
import GalleryScroll from "./components/GalleryScroll";


import "./styles/landing.css";
import "./styles/gallery.css";
import "./styles/home.css";


import HomeCliente from "./pages/HomeCliente";

// ====== PÁGINAS DO CLIENTE ======
function Buscar() {
  return <h2 style={{ textAlign: "center", marginTop: "80px" }}>Página de Buscar Veículos</h2>;
}

function Veiculos() {
  return <h2 style={{ textAlign: "center", marginTop: "80px" }}>Página de Veículos</h2>;
}

function Agenda() {
  return <h2 style={{ textAlign: "center", marginTop: "80px" }}>Página de Minha Agenda</h2>;
}

function Historico() {
  return <h2 style={{ textAlign: "center", marginTop: "80px" }}>Página de Histórico</h2>;
}

function Propostas() {
  return <h2 style={{ textAlign: "center", marginTop: "80px" }}>Página de Propostas</h2>;
}

function Suporte() {
  return <h2 style={{ textAlign: "center", marginTop: "80px" }}>Página de Suporte</h2>;
}

function Catalogo() {
  return <h2 style={{ textAlign: "center", marginTop: "80px" }}>Página de Catálogo de Veículos</h2>;
}

// ====== LANDING PAGE  ======
function LandingPage() {
  return (
    <main className="lp-root">
      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-container lp-hero-grid">
          <div className="lp-hero-left">
            <h1 className="lp-hero-title">
              Encontre o carro perfeito — ofertas exclusivas na sua região
            </h1>

            <p className="lp-hero-sub">
              Catálogo atualizado, financiamento integrado e atendimento direto das concessionárias.
            </p>

            <div className="lp-hero-cta">
              <a href="/catalog" className="btn primary large">Ver catálogo</a>
              <a href="/register" className="btn ghost large">Criar conta</a>
            </div>
          </div>

          <div className="lp-hero-right">
            <div className="lp-hero-card">
              <div className="lp-car-visual">🚘</div>
              <div className="lp-car-info">
                <h3>Novidade: Hatch X200</h3>
                <p>Entrada facilitada — parcelas a partir de R$799</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-features">
        <div className="lp-container">
          <div className="lp-features-grid">
            <article className="lp-feature-card">★ Filtros avançados</article>
            <article className="lp-feature-card">★ Credenciamento rápido</article>
            <article className="lp-feature-card">★ Painel de gestão</article>
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
      <section className="lp-cta">
        <div className="lp-container">
          <h3>Pronto para encontrar seu próximo carro?</h3>
          <a href="/register" className="btn primary">Criar Conta</a>
        </div>
      </section>
    </main>
  );
}

// ====== ROTAS DO APP ======
export default function App() {
  return (
    <Router>
      <Routes>

       
        <Route path="/" element={<HomeCliente />} />

       
        <Route path="/landing" element={<LandingPage />} />

        
        <Route path="/cliente/buscar" element={<Buscar />} />
        <Route path="/cliente/veiculos" element={<Veiculos />} />
        <Route path="/cliente/agenda" element={<Agenda />} />
        <Route path="/cliente/historico" element={<Historico />} />
        <Route path="/cliente/propostas" element={<Propostas />} />
        <Route path="/cliente/suporte" element={<Suporte />} />
        <Route path="/cliente/catalogo" element={<Catalogo />} />

        <Route path="/" element={<PerfilCliente />} />

        <Route path="/landing" element={<LandingPage />} />

      </Routes>
    </Router>
  );
}
