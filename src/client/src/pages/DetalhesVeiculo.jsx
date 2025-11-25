// client/src/pages/DetalhesVeiculo.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { CarFront } from "lucide-react";

import "../styles/landing.css";
import "../styles/detalhes.css";

function useVeiculoId() {
  const { id: routeId } = useParams();
  const location = useLocation();

  return useMemo(() => {
    if (routeId) return routeId;
    const params = new URLSearchParams(location.search);
    return params.get("id") || null;
  }, [routeId, location.search]);
}

export default function DetalhesVeiculo() {
  const veiculoId = useVeiculoId();

  const [veiculo, setVeiculo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!veiculoId) {
      setError(
        "Nenhum veículo selecionado. Informe um ID na URL, ex: /detalhes/1."
      );
      setIsLoading(false);
      return;
    }

    const fetchVeiculo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await axios.get(
          `http://localhost:3000/api/veiculos/${veiculoId}`
        );

        setVeiculo(res.data);
      } catch (err) {
        console.error("Erro ao carregar veículo:", err);
        setError(
          "Não foi possível carregar os detalhes do veículo. Tente novamente mais tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVeiculo();
  }, [veiculoId]);

  const tituloVeiculo =
    veiculo?.nome ||
    `${veiculo?.marca || ""} ${veiculo?.modelo || ""}`.trim() ||
    "Veículo";

  const descricaoVeiculo =
    veiculo?.descricao ||
    "SUV moderno e confortável, ideal para famílias e aventuras urbanas.";

  const imagemPrincipal =
    veiculo?.imagemUrl ||
    "https://placehold.co/800x450/111827/FFFFFF?text=Ve%C3%ADculo";

  const formatPrice = (price) => {
    if (price == null) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(price));
  };

  const formatKm = (km) => {
    if (km == null) return "—";
    return `${new Intl.NumberFormat("pt-BR").format(km)} km`;
  };

  return (
    <>
      {/* HEADER padrão do projeto – fora do <main> */}
      <nav className="lp-header">
        <div className="lp-container">
          <Link to="/" className="lp-brand">
            <CarFront />
            CanutoMotors
          </Link>

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
              <span className="nav-link">Perfil ▾</span>
            </div>
            <button type="button" className="header-login-btn">
              Entrar
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN da página de detalhes */}
      <main className="lp-root detalhes-root">
        {/* ESTADOS (loading / erro / não encontrado) */}
        {isLoading ? (
          <section className="detalhes-state">
            <p>Carregando detalhes do veículo...</p>
          </section>
        ) : error ? (
          <section className="detalhes-state">
            <p>{error}</p>
            <button
              type="button"
              className="btn-proposta"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </section>
        ) : !veiculo ? (
          <section className="detalhes-state">
            <p>Veículo não encontrado.</p>
          </section>
        ) : (
          <>
            {/* HERO: imagem grande */}
            <section className="lp-container detalhes-hero-img">
              <img
                src={imagemPrincipal}
                alt={tituloVeiculo}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/800x450/111827/FFFFFF?text=Imagem+indispon%C3%ADvel";
                }}
              />
            </section>

            {/* CONTEÚDO PRINCIPAL */}
            <section className="lp-container detalhes-main">
              <div className="detalhes-layout">
                {/* CARD PRINCIPAL */}
                <div className="detalhes-card">
                  <img
                    src={imagemPrincipal}
                    alt={tituloVeiculo}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x350/111827/FFFFFF?text=Imagem+indispon%C3%ADvel";
                    }}
                  />

                  <div className="detalhes-info">
                    <h1 className="detalhes-titulo">{tituloVeiculo}</h1>
                    <p className="detalhes-descricao">{descricaoVeiculo}</p>

                    <div className="ficha-tecnica">
                      <h4>FICHA TÉCNICA</h4>
                      <ul>
                        {veiculo.ano && (
                          <li>
                            <strong>Ano:</strong> {veiculo.ano}
                          </li>
                        )}
                        {veiculo.marca && (
                          <li>
                            <strong>Marca:</strong> {veiculo.marca}
                          </li>
                        )}
                        {veiculo.modelo && (
                          <li>
                            <strong>Modelo:</strong> {veiculo.modelo}
                          </li>
                        )}
                        {veiculo.quilometragem != null && (
                          <li>
                            <strong>KM:</strong> {formatKm(veiculo.quilometragem)}
                          </li>
                        )}
                        {veiculo.combustivel && (
                          <li>
                            <strong>Combustível:</strong> {veiculo.combustivel}
                          </li>
                        )}
                        {veiculo.cambio && (
                          <li>
                            <strong>Câmbio:</strong> {veiculo.cambio}
                          </li>
                        )}
                        {veiculo.status && (
                          <li>
                            <strong>Status:</strong> {veiculo.status}
                          </li>
                        )}
                      </ul>

                      <p>
                        <strong>Preço:</strong> {formatPrice(veiculo.preco)}
                      </p>

                      <button type="button" className="btn-detalhes">
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                {/* PRÓXIMOS PASSOS */}
                <section className="proximos-passos">
                  <h3>Próximos passos para sua compra</h3>
                  <p>
                    Estamos prontos para ajudar você a transformar seu sonho de
                    carro em realidade.
                  </p>
                  <div className="proximos-botoes">
                    <button type="button" className="btn-proposta">
                      Proposta
                    </button>
                    <button type="button" className="btn-testdrive">
                      Test Drive
                    </button>
                  </div>
                </section>
              </div>
            </section>
          </>
        )}

        {/* FOOTER padrão */}
        <footer className="lp-footer">
          <div className="lp-container">
            <small>
              © {new Date().getFullYear()} CanutoMotors — Todos os direitos
              reservados.
            </small>
          </div>
        </footer>
      </main>
    </>
  );
}
