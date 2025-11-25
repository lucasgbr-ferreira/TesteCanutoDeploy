// client/src/pages/SobreConcessionaria.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";
import { CarFront, Mail, Phone, MapPin, Users } from "lucide-react";

import "../styles/landing.css";
import "../styles/sobre.css";

function useConcessionariaId() {
  const { id: routeId } = useParams();
  const location = useLocation();

  return useMemo(() => {
    if (routeId) return routeId;
    const params = new URLSearchParams(location.search);
    return params.get("id") || "2"; // fallback pro 2
  }, [routeId, location.search]);
}

export default function SobreConcessionaria() {
  const concessionariaId = useConcessionariaId();

  const [concessionaria, setConcessionaria] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConcessionaria = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get(
          `http://localhost:3000/api/concessionarias/${concessionariaId}`
        );
        setConcessionaria(res.data);
      } catch (err) {
        console.error("Erro ao carregar concessionária:", err);
        setError(
          "Não foi possível carregar os dados da concessionária. Tente novamente mais tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchConcessionaria();
  }, [concessionariaId]);

  const nome = concessionaria?.nome || "Canuto Motors";
  const email = concessionaria?.email_comercial || "contato@canutomotors.com";
  const telefone = concessionaria?.telefone || "(38) 99967-0050";
  const enderecoObj = concessionaria?.endereco;
  const endereco = enderecoObj
    ? `${enderecoObj.rua}, ${enderecoObj.numero} - ${enderecoObj.cidade}`
    : "Av. Paulista, 1000 - Diamantina";

  return (
    <main className="lp-root sobre-root">
      {/* HEADER PADRÃO */}
      <nav className="lp-header">
        <div className="lp-container">
          {/* LOGO À ESQUERDA */}
          <Link to="/" className="lp-brand">
            <CarFront />
            CanutoMotors
          </Link>

          {/* LINKS + BOTÃO */}
          <div className="header-right">
            <div className="lp-nav">
              <Link to="/landing" className="nav-link">
                Início
              </Link>
              <Link to="/catalog" className="nav-link">
                Veículos
              </Link>
              <Link to="/promocoes" className="nav-link">
                Promoções
              </Link>
              <div className="nav-link">Perfil ▾</div>
            </div>

            <button className="header-login-btn">Entrar</button>
          </div>
        </div>
      </nav>

      {/* ESTADOS */}
      {isLoading ? (
        <section className="lp-container sobre-state">
          <div className="loading-spinner" />
          <p>Carregando informações da concessionária...</p>
        </section>
      ) : error ? (
        <section className="lp-container sobre-state">
          <p>{error}</p>
          <button
            className="btn primary"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </section>
      ) : (
        <>
          {/* HERO */}
          <section className="sobre-hero">
            <div className="lp-container sobre-hero-inner">
              <div className="sobre-hero-text">
                <p className="sobre-badge">Sobre</p>
                <h1>Sobre a {nome}</h1>
                <p className="sobre-hero-sub">
                  A {nome} simplifica a gestão e moderniza a experiência
                  automotiva com tecnologia e inovação.
                </p>
                <div className="sobre-hero-actions">
                  <a href="#inovacao" className="btn primary">
                    Saiba mais
                  </a>
                  <a href="#contato" className="btn ghost">
                    Contato
                  </a>
                </div>
                <div className="sobre-hero-tags">
                  <span>
                    <Users size={16} /> Foco em experiência do cliente
                  </span>
                  <span>
                    <CarFront size={16} /> Gestão inteligente de estoque
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* INOVAÇÃO */}
          <section id="inovacao" className="sobre-section">
            <div className="lp-container">
              <h3 className="sobre-kicker">Inovação</h3>
              <h2 className="sobre-title">
                Nossa história de evolução no mercado automotivo
              </h2>
              <p className="sobre-desc">
                Fundada para oferecer ao público uma experiência diferenciada na compra e venda de veículos, a{" "}
                <strong>{nome}</strong> garante que cada cliente encontre exatamente o que procura — com segurança e confiança.
              </p>

              <div className="sobre-missao-visao">
                <div className="sobre-pill">
                  <h4>Missão</h4>
                  <p>
                    Facilitar o acesso a veículos de qualidade, oferecendo atendimento humano, confiável e transparente, sempre priorizando as necessidades e expectativas dos nossos clientes.
                  </p>
                </div>
                <div className="sobre-pill">
                  <h4>Visão</h4>
                  <p>
                    Ser referência regional no setor automotivo, reconhecida pela credibilidade, compromisso com o cliente e pelo cuidado em cada etapa do processo, desde a escolha do veículo até o pós-venda..
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* DEPOIMENTOS */}
          <section className="sobre-depoimentos">
            <div className="lp-container">
              <h2>O que dizem de nós</h2>
              <p className="sub">Histórias reais de clientes</p>

              <div className="sobre-cards">

                <article className="sobre-card">
                  <p>“Fui muito bem atendido e negociei o meu antigo veículo. A equipe faz toda a diferença.”</p>
                  <p><strong>Carlos Santos</strong></p>
                  <span>Representante, 44 anos </span>
                </article>

                <article className="sobre-card">
                  <p>“A Canuto Motors me surpreendeu pela honestidade e transparência. Processo rápido, sem complicações.”</p>
                  <p><strong>Marisa Oliveira</strong></p>
                  <span>Compradora, 52 anos</span>
                </article>

                <article className="sobre-card">
                  <p>“Excelente variedade de veículos e atendimento impecável. Super indico para quem busca confiança.”</p>
                  <p><strong>João Silva</strong></p>
                  <span>Comprador, 46 anos</span>
                </article>

              </div>
            </div>
          </section>


          {/* CONTATO */}
          <section id="contato" className="sobre-contato">
            <div className="lp-container sobre-contato-grid">
              <div className="sobre-contato-info">
                <h2>Fale conosco</h2>
                <p className="sub">Estamos prontos para ajudar você.</p>

                <ul>
                  <li>
                    <Mail size={18} />
                    <div>
                      <span>Email:</span>
                      <strong>{email}</strong>
                    </div>
                  </li>
                  <li>
                    <Phone size={18} />
                    <div>
                      <span>Telefone:</span>
                      <strong>{telefone}</strong>
                    </div>
                  </li>
                  <li>
                    <MapPin size={18} />
                    <div>
                      <span>Endereço:</span>
                      <strong>{endereco}</strong>
                    </div>
                  </li>
                </ul>
              </div>

              <form
                className="sobre-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <h3>Envie uma mensagem</h3>
                <div className="form-group">
                  <label>Nome</label>
                  <input type="text" placeholder="Seu nome completo" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="voce@exemplo.com" />
                </div>
                <div className="form-group">
                  <label>Mensagem</label>
                  <textarea rows={4} placeholder="Como podemos ajudar?" />
                </div>
                <button type="submit" className="btn primary">
                  Enviar
                </button>
              </form>
            </div>
          </section>
        </>
      )}

      {/* FOOTER PADRÃO DO PROJETO */}
      <footer className="lp-footer">
        <div className="lp-container">
          <small>
            © {new Date().getFullYear()} CanutoMotors — Todos os direitos
            reservados.
          </small>
        </div>
      </footer>
    </main>
  );
}
