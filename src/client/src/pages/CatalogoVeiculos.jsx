// client/src/pages/CatalogoVeiculos.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  CarFront,
  Calendar,
  Tag,
  MapPin,
  Fuel,
  Cog,
  Gauge,
  Users,
  Heart,
  LogOut,
  Menu,
  X,
  Car,
  Palette,
  Settings,
  ChevronDown,
  ChevronUp,
  Building
} from 'lucide-react';

import "../styles/landing.css";
import "../styles/catalog.css";

// --- Variantes de Animação ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

// --- Sub-Componentes (Dropdown e Modal) ---
function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="nav-link">
        Perfil
        <svg className={`dropdown-arrow ${isOpen ? 'open' : ''}`} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="dropdown-menu"
          >
            <a href="#" className="dropdown-item"><Users width={16} height={16} /> Minha Conta</a>
            <a href="#" className="dropdown-item"><Heart width={16} height={16} /> Meus Favoritos</a>
            <hr />
            <a href="#" className="dropdown-item"><LogOut width={16} height={16} /> Sair</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoginModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Acessar Conta</h3>
              <button onClick={onClose} className="modal-close-btn">
                <X width={24} height={24} />
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="emailInput">Email</label>
                  <input type="email" id="emailInput" placeholder="voce@exemplo.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordInput">Senha</label>
                  <input type="password" id="passwordInput" />
                </div>
              </div>
              <div className="modal-footer">
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Componente Principal (O Catálogo) ---
export default function CatalogoVeiculos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [veiculos, setVeiculos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar veículos do banco de dados
  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3000/api/veiculos');
        
        // Adicionar informações da concessionária aos veículos
        const veiculosComConcessionaria = await Promise.all(
          response.data.map(async (veiculo) => {
            try {
              // Buscar informações da concessionária
              if (veiculo.concessionaria_id) {
                const concessionariaResponse = await axios.get(`http://localhost:3000/api/concessionarias/${veiculo.concessionaria_id}`);
                return {
                  ...veiculo,
                  concessionaria: concessionariaResponse.data
                };
              }
              return veiculo;
            } catch (error) {
              console.error(`Erro ao buscar concessionária para veículo ${veiculo.id}:`, error);
              return {
                ...veiculo,
                concessionaria: { nome: 'Concessionária não disponível' }
              };
            }
          })
        );
        
        setVeiculos(veiculosComConcessionaria);
      } catch (err) {
        console.error("Erro ao buscar veículos:", err);
        setError("Não foi possível carregar os veículos. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVeiculos();
  }, []);

  const navLinks = [
    { name: 'Início', href: '/catalog' },
    { name: 'Veículos', href: '/catalog' },
    { name: 'Promoções', href: '/catalog' },
  ];

  // Função para formatar preço
  const formatPrice = (price) => {
    if (!price) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  // Função para formatar quilometragem
  const formatKm = (km) => {
    if (km == null) return 'N/A';
    return new Intl.NumberFormat('pt-BR').format(km) + ' km';
  };

  return (
    <main className="lp-root">

      {/* 1. Navbar (Menu Superior) */}
      <nav className="lp-header">
        <div className="lp-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="lp-brand">
            <CarFront />
            CanutoMotors
          </Link>

          {/* Menu Desktop */}
          <div className="lp-nav">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="nav-link">
                {link.name}
              </Link>
            ))}
            <ProfileDropdown />

          </div>

          {/* Botão Mobile */}
          <div className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mobile-menu-dropdown"
            >
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} className="nav-link">
                  {link.name}
                </Link>
              ))}
              <ProfileDropdown />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Seção Hero */}
      <motion.header
        className="catalog-hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lp-container">
          <motion.h1 variants={fadeUp}>
            Catálogo de veículos
          </motion.h1>
          <motion.p variants={fadeUp} custom={0.1}>
            {veiculos.length > 0
              ? `${veiculos.length} veículos disponíveis em nosso estoque`
              : 'Descubra os melhores carros disponíveis'
            }
          </motion.p>
        </div>
      </motion.header>

      {/* 3. Seção Introdução */}
      <motion.section
        className="catalog-intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lp-container">
          <motion.h6 variants={fadeUp}>Carros</motion.h6>
          <motion.h2 variants={fadeUp} custom={0.1}>
            Encontre seu próximo veículo
          </motion.h2>
          <motion.p variants={fadeUp} custom={0.2}>
            Navegue por uma seleção completa de carros cadastrados em nosso sistema
          </motion.p>
        </div>
      </motion.section>

      {/* 4. Seção Grid */}
      <main className="lp-container" style={{ paddingBottom: '72px', paddingTop: '36px' }}>
        {isLoading ? (
          <div className="catalog-loading">
            <div className="loading-spinner"></div>
            <p>Carregando veículos...</p>
          </div>
        ) : error ? (
          <div className="catalog-error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn primary" style={{ marginTop: '16px' }}>
              Tentar Novamente
            </button>
          </div>
        ) : veiculos.length === 0 ? (
          <div className="catalog-empty">
            <div className="catalog-empty-icon">🚗</div>
            <h3>Nenhum veículo cadastrado</h3>
            <p>Volte mais tarde para ver nossos veículos disponíveis.</p>
            <Link to="/dashboard/estoque" className="btn primary" style={{ marginTop: '16px' }}>
              Gerenciar Estoque
            </Link>
          </div>
        ) : (
          <motion.div
            className="catalog-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {veiculos.map(vehicle => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                formatPrice={formatPrice}
                formatKm={formatKm}
              />
            ))}
          </motion.div>
        )}
      </main>

      {/* 5. Footer */}
      <footer className="lp-footer">
        <div className="lp-container">
          <small>© {new Date().getFullYear()} CanutoMotors — Todos os direitos reservados.</small>
        </div>
      </footer>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

// --- Componente do Card ---
function VehicleCard({ vehicle, formatPrice, formatKm }) {
  const [showDetails, setShowDetails] = useState(false);

  // Verificar se o veículo está disponível para contato
  const isAvailable = vehicle.status === 'Disponível';

  // Obter nome da concessionária
  const concessionariaNome = vehicle.concessionaria?.nome || 'Canuto Motors';

  return (
    <motion.div
      className="vehicle-card"
      variants={fadeUp}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="vehicle-card-img-container">
        <img
          src={vehicle.imagemUrl || 'https://placehold.co/600x400/334155/FFF?text=Sem+Imagem'}
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          className="vehicle-card-img"
        />
        <div className="vehicle-card-badge">
          <Tag size={14} />
          {vehicle.placa}
        </div>

        {/* Badge de Status - MANTIDO COMO ESTAVA */}
        <div className={`vehicle-status-badge ${!isAvailable ? 'status-unavailable' : ''}`}>
          {vehicle.status}
        </div>
      </div>

      <div className="vehicle-card-body">
        <h3 className="vehicle-card-title">
          {vehicle.marca} {vehicle.modelo}
        </h3>

        {/* Informações principais em grid - MODIFICADO: Status substituído por Concessionária */}
        <div className="vehicle-card-info-grid">
          {vehicle.ano && (
            <div className="info-item">
              <Calendar size={16} />
              <span>Ano: <strong>{vehicle.ano}</strong></span>
            </div>
          )}

          {vehicle.quilometragem !== null && vehicle.quilometragem !== undefined && (
            <div className="info-item">
              <Gauge size={16} />
              <span>KM: <strong>{formatKm(vehicle.quilometragem)}</strong></span>
            </div>
          )}

          {vehicle.cor && (
            <div className="info-item">
              <Palette size={16} />
              <span>Cor: <strong>{vehicle.cor}</strong></span>
            </div>
          )}

          {vehicle.combustivel && (
            <div className="info-item">
              <Fuel size={16} />
              <span>Combustível: <strong>{vehicle.combustivel}</strong></span>
            </div>
          )}

          {vehicle.cambio && (
            <div className="info-item">
              <Cog size={16} />
              <span>Câmbio: <strong>{vehicle.cambio}</strong></span>
            </div>
          )}

          {/* ITEM MODIFICADO: Status substituído por Concessionária */}
          <div className="info-item">
            <Building size={16} />
            <span>Concessionária: <strong>{concessionariaNome}</strong></span>
          </div>
        </div>

        {/* Informações adicionais (expandíveis) */}
        {(vehicle.especificacoes || vehicle.historico || vehicle.laudoTecnico) && (
          <div className="vehicle-additional-info">
            <button
              className="btn-details-toggle"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <>
                  <ChevronUp size={14} />
                  Ocultar Detalhes
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  Ver Detalhes Completos
                </>
              )}
            </button>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="details-content"
                >
                  {vehicle.especificacoes && (
                    <div className="detail-section">
                      <h4>Especificações Técnicas</h4>
                      <p>{vehicle.especificacoes}</p>
                    </div>
                  )}

                  {vehicle.historico && (
                    <div className="detail-section">
                      <h4>Histórico do Veículo</h4>
                      <p>{vehicle.historico}</p>
                    </div>
                  )}

                  {vehicle.laudoTecnico && (
                    <div className="detail-section">
                      <h4>Laudo Técnico</h4>
                      <p>{vehicle.laudoTecnico}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="vehicle-card-footer">
        <div className="price-section">
          <span className="price-label">Preço</span>
          <span className="price-value">{formatPrice(vehicle.preco)}</span>
        </div>
        <button
          className={`btn-contact ${!isAvailable ? 'disabled' : ''}`}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Entrar em Contato' : 'Indisponível'}
        </button>
      </div>
    </motion.div>
  );
}