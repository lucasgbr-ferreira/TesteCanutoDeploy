import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CarFront, 
  Gauge, 
  Cog, 
  Fuel, 
  BatteryCharging,
  Users,
  Heart,
  LogOut,
  Menu,
  X
} from 'lucide-react';

import "../styles/landing.css";
import "../styles/catalog.css";

// --- Variantes de Animação (do seu App.jsx) ---
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

// --- Dados Mockados (para o catálogo) ---
const vehiclesData = [
    { id: 1, name: 'SUV Compacto 2024', desc: 'Automático, Flex, 4 Portas.', imgUrl: 'https://placehold.co/600x400/334155/FFF?text=SUV+Moderno', specs: [{ icon: Gauge, label: '0km' }, { icon: Cog, label: 'Auto' }, { icon: Fuel, label: 'Flex' }], price: '139.990' },
    { id: 2, name: 'Sedan Premium 2023', desc: 'Seminovo, 15.000km, Teto Solar.', imgUrl: 'https://placehold.co/600x400/475569/FFF?text=Sedan+Executivo', specs: [{ icon: Gauge, label: '15k km' }, { icon: Cog, label: 'Auto' }, { icon: Fuel, label: 'Gasolina' }], price: '185.000' },
    { id: 3, name: 'Hatchback Turbo 2024', desc: '0km, Manual, Edição Esportiva.', imgUrl: 'https://placehold.co/600x400/1E293B/FFF?text=Hatch+Esportivo', specs: [{ icon: Gauge, label: '0km' }, { icon: Cog, label: 'Manual' }, { icon: Fuel, label: 'Gasolina' }], price: '112.500' },
    { id: 4, name: 'Pickup 4x4 Diesel', desc: 'Seminovo, 45.000km, 2022.', imgUrl: 'https://placehold.co/600x400/334155/FFF?text=Pickup+Robusta', specs: [{ icon: Gauge, label: '45k km' }, { icon: Cog, label: 'Auto' }, { icon: Fuel, label: 'Diesel' }], price: '210.000' },
];


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
                <button type="submit" className="btn primary" style={{ width: '100%' }}>
                  Entrar
                </button>
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

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Veículos', href: '/catalog' },
    { name: 'Promoções', href: '/promocoes' },
  ];

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
            <button onClick={() => setIsModalOpen(true)} className="btn primary small">
              Entrar
            </button>
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
            Descubra os melhores carros disponíveis
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
            Navegue por uma seleção completa de carros novos e seminovos
          </motion.p>
        </div>
      </motion.section>

      {/* 4. Seção Grid */}
      <main className="lp-container" style={{ paddingBottom: '72px', paddingTop: '36px' }}>
        <motion.div 
          className="catalog-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {vehiclesData.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </motion.div>
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

// --- Componente do Card (Estilo catalog.css) ---
function VehicleCard({ vehicle }) {
  return (
    <motion.a 
      href={`/detalhes-veiculo/${vehicle.id}`} 
      className="vehicle-card"
      variants={fadeUp}
    >
      <img src={vehicle.imgUrl} alt={vehicle.name} className="vehicle-card-img" />
      <div className="vehicle-card-body">
        <h3>{vehicle.name}</h3>
        <p>{vehicle.desc}</p>
        
        <div className="vehicle-card-specs">
          {vehicle.specs.map((spec, index) => (
            <div key={index} className="spec-tag">
              <spec.icon width={14} height={14} />
              {spec.label}
            </div>
          ))}
        </div>
      </div>
      <div className="vehicle-card-footer">
        <span>R$ {vehicle.price}</span>
      </div>
    </motion.a>
  );
}