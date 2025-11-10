import React, { useEffect, useState } from "react";
import HeaderCliente from "../components/HeaderCliente";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaHistory, FaHandshake, FaHeadset, FaCar } from "react-icons/fa";

export default function HomeCliente() {
  const navigate = useNavigate();

  // 1) Inicializa já com valor do localStorage (ou "Cliente")
  const [nomeUsuario, setNomeUsuario] = useState(() => {
    try {
      const nome = localStorage.getItem("nomeUsuario");
      if (nome && nome.trim() !== "") return nome.trim();
      localStorage.setItem("nomeUsuario", "Cliente");
      return "Cliente";
    } catch {
      return "Cliente";
    }
  });

  // 2) Se vier ?nome=Gabi na URL, usa e salva
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const nomeParam = params.get("nome");
      if (nomeParam && nomeParam.trim() !== "") {
        const limpo = nomeParam.trim();
        localStorage.setItem("nomeUsuario", limpo);
        setNomeUsuario(limpo);
      }
    } catch {}
  }, []);

  useEffect(() => {
    window.setNomeTeste = (novo) => {
      const limpo = (novo || "").trim() || "Cliente";
      localStorage.setItem("nomeUsuario", limpo);
      setNomeUsuario(limpo);
    };
    return () => { delete window.setNomeTeste; };
  }, []);

  return (
    <div className="home-wrapper">
      {/* ====================== CABEÇALHO ====================== */}
      <HeaderCliente />

      {/* ====================== HERO ====================== */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>
              Bem-vindo, <span className="nome-destaque">{nomeUsuario}</span>!
            </h1>
            <p>Encontre seu próximo veículo com praticidade e confiança.</p>

            <div className="hero-buttons">
              <button className="btn" onClick={() => navigate("/buscar")}>
                Buscar Veículos
              </button>
              <button className="btn-outline" onClick={() => navigate("/veiculos")}>
                Ver todos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== CONTEÚDO PRINCIPAL ====================== */}
      <main className="home-container">
        {/* ===== SUAS AÇÕES ===== */}
        <section className="actions-section">
          <h2>Suas Ações</h2>
          <p>Gerencie tudo de forma prática e segura.</p>

          <div className="actions-grid">
            <div className="action-card" onClick={() => navigate("/agenda")}>
              <FaCalendarAlt className="icon" />
              <h3>Minha Agenda</h3>
            </div>

            <div className="action-card" onClick={() => navigate("/historico")}>
              <FaHistory className="icon" />
              <h3>Histórico</h3>
            </div>

            <div className="action-card" onClick={() => navigate("/propostas")}>
              <FaHandshake className="icon" />
              <h3>Propostas</h3>
            </div>

            <div className="action-card" onClick={() => navigate("/catalogo")}>
              <FaCar className="icon" />
              <h3>Ver Catálogo</h3>
            </div>

            <div className="action-card" onClick={() => navigate("/suporte")}>
              <FaHeadset className="icon" />
              <h3>Suporte</h3>
            </div>
          </div>
        </section>

        {/* ===== BENEFÍCIOS ===== */}
        <section className="benefit-section">
          <div className="benefit-card">
            <img
              src="https://redaweb.com.br/uploads/posts/643/veja-como-atrair-clientes-para-sua-loja-de-carros-com-as-redes-sociais.jpg"
              alt="Por que escolher a Canuto"
            />
            <div className="benefit-text">
              <h2>Por que escolher a GesCar?</h2>
              <p>
                Escolher a GesCar é investir em confiança, transparência e atendimento personalizado.
                Nossos clientes têm acesso a condições especiais, suporte completo e veículos selecionados
                com garantia de procedência.
              </p>
            </div>
          </div>
        </section>

        <section className="benefit-section">
          <div className="benefit-card reverse">
            <img
              src="https://blog.valiantseguros.com/wp-content/uploads/2021/09/valiantcorretoradeseguros_valiantcorretoradeseguros_image_488-scaled.jpeg"
              alt="Para quem já é cliente"
            />
            <div className="benefit-text">
              <h2>Para quem já é cliente</h2>
              <p>
                Nossos clientes contam com benefícios exclusivos: descontos em revisões,
                atendimento prioritário e oportunidades únicas para trocar ou atualizar seu veículo.
              </p>
            </div>
          </div>
        </section>

        {/* ===== OFERTAS ===== */}
        <section className="offers-section">
          <h2>Ofertas</h2>
          <p>Confira as melhores oportunidades selecionadas para você.</p>

          <div className="offer-card-bg" onClick={() => navigate("/ofertas")}>
            <div className="offer-bg-overlay">
              <p>Aproveite preços exclusivos e veículos selecionados.</p>
              <button className="offer-btn-bg">Ver Ofertas</button>
            </div>
          </div>
        </section>
      </main>

      {/* ====================== RODAPÉ ====================== */}
      <footer className="footer">
        <p>© 2025 CanutoMotors. Todos os direitos reservados.</p>
        <div className="links">
          <a href="#">Política de Privacidade</a> |{" "}
          <a href="#">Termos de Uso</a> | <a href="#">Ajuda</a>
        </div>
      </footer>
    </div>
  );
}
