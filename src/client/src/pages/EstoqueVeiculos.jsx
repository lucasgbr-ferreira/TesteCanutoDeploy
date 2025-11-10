// client/src/pages/EstoqueVeiculos.jsx

// --- Imports ---
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  CarFront,
  Users,
  Heart,
  LogOut,
  Menu,
  X,
  Car,
  CheckSquare,
  Wrench,
  ArrowRight,
  Edit,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Gauge,
  Calendar,
  Palette,
  Fuel,
  Settings
} from 'lucide-react';

import "../styles/landing.css";
import "../styles/stock.css";

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

// --- Funções de Validação ---
const validateField = (name, value) => {
  const errors = [];

  switch (name) {
    case 'placa':
      const placaClean = value.toUpperCase().replace(/\s/g, '');
      if (!placaClean) {
        errors.push('Placa é obrigatória');
      } else if (placaClean.length < 7 || placaClean.length > 8) {
        errors.push('Placa deve ter entre 7 e 8 caracteres');
      } else if (!/^[A-Z0-9]+$/.test(placaClean)) {
        errors.push('Placa deve conter apenas letras e números');
      }
      break;

    case 'modelo':
      if (!value.trim()) {
        errors.push('Modelo é obrigatório');
      } else if (value.length < 2) {
        errors.push('Modelo deve ter pelo menos 2 caracteres');
      }
      break;

    case 'marca':
      if (!value.trim()) {
        errors.push('Marca é obrigatória');
      } else if (value.length < 2) {
        errors.push('Marca deve ter pelo menos 2 caracteres');
      }
      break;

    case 'ano':
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      if (value && (year < 1900 || year > currentYear + 1)) {
        errors.push(`Ano deve estar entre 1900 e ${currentYear + 1}`);
      }
      break;

    case 'preco':
      const price = parseFloat(value);
      if (value && price < 0) {
        errors.push('Preço não pode ser negativo');
      }
      break;

    case 'quilometragem':
      const km = parseInt(value);
      if (value && km < 0) {
        errors.push('Quilometragem não pode ser negativa');
      }
      break;

    case 'imagemUrl':
      if (value && !/^https?:\/\/.+\..+/.test(value)) {
        errors.push('URL da imagem deve ser válida');
      }
      break;

    default:
      break;
  }

  return errors;
};

const validateForm = (formData) => {
  const errors = {};
  let isValid = true;

  Object.keys(formData).forEach(field => {
    const fieldErrors = validateField(field, formData[field]);
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
      isValid = false;
    }
  });

  // Validações específicas do formulário
  if (!formData.placa) {
    errors.placa = ['Placa é obrigatória'];
    isValid = false;
  }
  if (!formData.modelo) {
    errors.modelo = ['Modelo é obrigatório'];
    isValid = false;
  }
  if (!formData.marca) {
    errors.marca = ['Marca é obrigatória'];
    isValid = false;
  }

  return { isValid, errors };
};

// --- Sub-Componentes (Dropdown e Modal de Login) ---
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

// --- Componente Principal (Dashboard) ---
export default function EstoqueVeiculos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- LÓGICA DO FORMULÁRIO (MODIFICADO COM VALIDAÇÕES) ---
  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    marca: '',
    ano: '',
    preco: '',
    imagemUrl: '',
    // NOVOS CAMPOS
    especificacoes: '',
    historico: '',
    laudoTecnico: '',
    quilometragem: '',
    cor: '',
    combustivel: '',
    cambio: '',
    status: 'Disponível'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // --- LÓGICA DO MODAL DE VEÍCULOS ---
  const [isVeiculoModalOpen, setIsVeiculoModalOpen] = useState(false);
  const [veiculos, setVeiculos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- ESTADOS PARA EDIÇÃO ---
  const [veiculoEditando, setVeiculoEditando] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editErrors, setEditErrors] = useState({});

  // --- Função para buscar veículos ---
  const fetchVeiculos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/api/veiculos');
      setVeiculos(response.data);
    } catch (err) {
      console.error("Erro ao buscar veículos:", err);
      setError("Não foi possível carregar os veículos.");
      setVeiculos([]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handlers do Modal de Veículos ---
  const handleOpenVeiculoModal = () => {
    setIsVeiculoModalOpen(true);
    fetchVeiculos();
  };

  const handleCloseVeiculoModal = () => {
    setIsVeiculoModalOpen(false);
    setIsEditMode(false);
    setVeiculoEditando(null);
    setEditErrors({});
  };

  // --- Função para excluir veículo ---
  const handleDeleteVeiculo = async (veiculoId) => {
    if (!window.confirm('Tem certeza que deseja excluir este veículo?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/veiculos/${veiculoId}`);

      setVeiculos(prevVeiculos =>
        prevVeiculos.filter(veiculo => veiculo.id !== veiculoId)
      );

      alert('Veículo excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
      alert('Erro ao excluir veículo. Tente novamente.');
    }
  };

  // --- Função para editar veículo ---
  const handleEditVeiculo = (veiculo) => {
    setVeiculoEditando({ ...veiculo });
    setIsEditMode(true);
    setEditErrors({});
  };

  // --- Função para validar edição ---
  const validateEditField = (field, value) => {
    const errors = validateField(field, value);
    if (errors.length > 0) {
      setEditErrors(prev => ({ ...prev, [field]: errors }));
      return false;
    } else {
      setEditErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      return true;
    }
  };

  // --- Função para salvar edição ---
  const handleSaveEdit = async () => {
    if (!veiculoEditando) return;

    // Validar todos os campos antes de salvar
    let hasErrors = false;
    const requiredFields = ['placa', 'modelo', 'marca'];

    requiredFields.forEach(field => {
      if (!veiculoEditando[field]) {
        setEditErrors(prev => ({
          ...prev,
          [field]: [`${field.charAt(0).toUpperCase() + field.slice(1)} é obrigatório`]
        }));
        hasErrors = true;
      }
    });

    Object.keys(veiculoEditando).forEach(field => {
      if (!validateEditField(field, veiculoEditando[field])) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      alert('Por favor, corrija os erros antes de salvar.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/veiculos/${veiculoEditando.id}`,
        veiculoEditando
      );

      setVeiculos(prevVeiculos =>
        prevVeiculos.map(veiculo =>
          veiculo.id === veiculoEditando.id ? response.data : veiculo
        )
      );

      setIsEditMode(false);
      setVeiculoEditando(null);
      setEditErrors({});
      alert('Veículo atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
      if (error.response?.data?.errors) {
        alert(`Erro de validação: ${error.response.data.errors.join(', ')}`);
      } else {
        alert('Erro ao atualizar veículo. Tente novamente.');
      }
    }
  };

  // --- Função para cancelar edição ---
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setVeiculoEditando(null);
    setEditErrors({});
  };

  // --- Função para atualizar campo em edição ---
  const handleEditFieldChange = (field, value) => {
    setVeiculoEditando(prev => ({
      ...prev,
      [field]: value
    }));

    // Validação em tempo real
    validateEditField(field, value);
  };

  // --- Handlers do Formulário Principal ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Validação em tempo real
    const errors = validateField(name, value);
    if (errors.length > 0) {
      setFormErrors(prev => ({ ...prev, [name]: errors }));
    } else {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação completa do formulário
    const { isValid, errors } = validateForm(formData);
    setFormErrors(errors);

    if (!isValid) {
      alert('Por favor, corrija os erros no formulário antes de enviar.');
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    const endpoint = 'http://localhost:3000/api/veiculos';

    try {
      // Formatar dados antes do envio
      const dadosEnvio = {
        ...formData,
        placa: formData.placa.toUpperCase().replace(/\s/g, ''),
        ano: formData.ano ? parseInt(formData.ano) : null,
        preco: formData.preco ? parseFloat(formData.preco) : null,
        quilometragem: formData.quilometragem ? parseInt(formData.quilometragem) : null
      };

      const response = await axios.post(endpoint, dadosEnvio);

      console.log('Veículo cadastrado:', response.data);
      setSubmitSuccess(true);

      // Limpa o formulário
      setFormData({
        placa: '',
        modelo: '',
        marca: '',
        ano: '',
        preco: '',
        imagemUrl: '',
        especificacoes: '',
        historico: '',
        laudoTecnico: '',
        quilometragem: '',
        cor: '',
        combustivel: '',
        cambio: '',
        status: 'Disponível'
      });
      setFormErrors({});

      setTimeout(() => setSubmitSuccess(false), 5000);

    } catch (error) {
      const errorMessage = error.response ?
        (error.response.data.errors ? error.response.data.errors.join(', ') : error.response.data.message)
        : error.message;
      console.error('Erro ao cadastrar:', errorMessage);
      alert(`Erro ao cadastrar veículo: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { name: 'Início', href: '/dashboard/estoque' },
    { name: 'Veículos', href: '/catalog' },
    { name: 'Promoções', href: '/catalog' },
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

      {/* 2. Seção Hero (Dashboard) */}
      <motion.header
        className="dash-hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lp-container">
          <motion.h1 variants={fadeUp}>
            Estoque de veículos da concessionária
          </motion.h1>
          <motion.p variants={fadeUp} custom={0.1}>
            Gerencie com precisão todos os veículos disponíveis em seu estoque.
          </motion.p>
          <motion.div className="dash-hero-cta" variants={fadeUp} custom={0.2}>
            <a href="#add-veiculo" className="btn primary">Adicionar Veículo</a>
            <button className="btn ghost">Filtrar Estoque</button>
          </motion.div>
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
        <div className="lp-container" style={{ marginTop: "40px" }}>
          <motion.h2 variants={fadeUp} custom={0.1}>
            Catálogo completo
          </motion.h2>
          <motion.p variants={fadeUp} custom={0.2}>
            Visualize todos os veículos cadastrados em um único lugar.
          </motion.p>
        </div>

      </motion.section>

      {/* 4. Seção Grid de Ações */}
      <main className="lp-container" style={{ paddingBottom: '72px', paddingTop: '36px' }}>
        <motion.div
          className="dash-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <DashboardCard
            icon={Car}
            title="Veículos disponíveis para venda"
            desc="Confira os detalhes de cada veículo do estoque."
            linkText="Detalhes"
            onClick={handleOpenVeiculoModal}
          />
          <DashboardCard
            icon={CheckSquare}
            title="Veículos vendidos"
            desc="Histórico de vendas concluídas."
            linkText="Relatório"
          />
          <DashboardCard
            icon={Wrench}
            title="Veículos em manutenção"
            desc="Acompanhe veículos temporariamente indisponíveis."
            linkText="Manutenção"
          />
        </motion.div>

        {/* 5. Seção Adicionar Veículo (MODIFICADA COM VALIDAÇÕES) */}
        <motion.section
          id="add-veiculo"
          className="dash-add-form"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2>Adicionar novo veículo</h2>
          <p>
            Insira todas as informações necessárias para cadastrar um novo veículo.
          </p>

          <form onSubmit={handleSubmit} className="dash-real-form">

            {/* Linha 1: Placa, Marca, Modelo */}
            <div className="form-row">
              <div className="form-group small">
                <label htmlFor="placa">Placa *</label>
                <input
                  type="text"
                  id="placa"
                  name="placa"
                  value={formData.placa}
                  onChange={handleChange}
                  className={formErrors.placa ? 'error' : ''}
                  placeholder="ABC1D23"
                  required
                />
                {formErrors.placa && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    {formErrors.placa[0]}
                  </div>
                )}
              </div>
              <div className="form-group medium">
                <label htmlFor="marca">Marca *</label>
                <input
                  type="text"
                  id="marca"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  className={formErrors.marca ? 'error' : ''}
                  placeholder="ex: Toyota"
                  required
                />
                {formErrors.marca && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    {formErrors.marca[0]}
                  </div>
                )}
              </div>
              <div className="form-group large">
                <label htmlFor="modelo">Modelo *</label>
                <input
                  type="text"
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className={formErrors.modelo ? 'error' : ''}
                  placeholder="ex: Corolla XEI"
                  required
                />
                {formErrors.modelo && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    {formErrors.modelo[0]}
                  </div>
                )}
              </div>
            </div>

            {/* Linha 2: Ano, Preço, Quilometragem */}
            <div className="form-row">
              <div className="form-group small">
                <label htmlFor="ano">Ano</label>
                <input
                  type="number"
                  id="ano"
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange}
                  className={formErrors.ano ? 'error' : ''}
                  placeholder="ex: 2024"
                />
                {formErrors.ano && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    {formErrors.ano[0]}
                  </div>
                )}
              </div>
              <div className="form-group medium">
                <label htmlFor="preco">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  id="preco"
                  name="preco"
                  value={formData.preco}
                  onChange={handleChange}
                  className={formErrors.preco ? 'error' : ''}
                  placeholder="ex: 75000.00"
                />
                {formErrors.preco && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    {formErrors.preco[0]}
                  </div>
                )}
              </div>
              <div className="form-group small">
                <label htmlFor="quilometragem">Quilometragem</label>
                <input
                  type="number"
                  id="quilometragem"
                  name="quilometragem"
                  value={formData.quilometragem}
                  onChange={handleChange}
                  className={formErrors.quilometragem ? 'error' : ''}
                  placeholder="ex: 50000"
                />
                {formErrors.quilometragem && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    {formErrors.quilometragem[0]}
                  </div>
                )}
              </div>
            </div>

            {/* Linha 3: Cor, Combustível, Câmbio */}
            <div className="form-row">
              <div className="form-group small">
                <label htmlFor="cor">Cor</label>
                <input
                  type="text"
                  id="cor"
                  name="cor"
                  value={formData.cor}
                  onChange={handleChange}
                  placeholder="ex: Prata"
                />
              </div>
              <div className="form-group small">
                <label htmlFor="combustivel">Combustível</label>
                <select
                  id="combustivel"
                  name="combustivel"
                  value={formData.combustivel}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Álcool">Álcool</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Flex">Flex</option>
                  <option value="Elétrico">Elétrico</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
              <div className="form-group small">
                <label htmlFor="cambio">Câmbio</label>
                <select
                  id="cambio"
                  name="cambio"
                  value={formData.cambio}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="Manual">Manual</option>
                  <option value="Automático">Automático</option>
                  <option value="Automático Sequencial">Automático Sequencial</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>
              <div className="form-group small">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Disponível">Disponível</option>
                  <option value="Vendido" disabled>Vendido</option>
                  <option value="Em Manutenção" disabled>Em Manutenção</option>
                </select>
              </div>
            </div>

            {/* Linha 4: URL da Imagem */}
            <div className="form-row">
              <div className="form-group large" style={{ flexGrow: 10 }}>
                <label htmlFor="imagemUrl">URL da Imagem</label>
                <input
                  type="text"
                  id="imagemUrl"
                  name="imagemUrl"
                  value={formData.imagemUrl}
                  onChange={handleChange}
                  className={formErrors.imagemUrl ? 'error' : ''}
                  placeholder="https://exemplo.com/foto-do-carro.png"
                />
                {formErrors.imagemUrl && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    {formErrors.imagemUrl[0]}
                  </div>
                )}
              </div>
            </div>

            {/* NOVOS CAMPOS: Especificações, Histórico, Laudo Técnico */}
            <div className="form-row">
              <div className="form-group large" style={{ flexGrow: 10 }}>
                <label htmlFor="especificacoes">Especificações Técnicas</label>
                <textarea
                  id="especificacoes"
                  name="especificacoes"
                  value={formData.especificacoes}
                  onChange={handleChange}
                  placeholder="Detalhes do motor, potência, consumo, dimensões, etc."
                  rows="4"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group large" style={{ flexGrow: 10 }}>
                <label htmlFor="historico">Histórico do Veículo</label>
                <textarea
                  id="historico"
                  name="historico"
                  value={formData.historico}
                  onChange={handleChange}
                  placeholder="Histórico de proprietários, acidentes, manutenções anteriores, etc."
                  rows="4"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group large" style={{ flexGrow: 10 }}>
                <label htmlFor="laudoTecnico">Laudo Técnico/Revisões</label>
                <textarea
                  id="laudoTecnico"
                  name="laudoTecnico"
                  value={formData.laudoTecnico}
                  onChange={handleChange}
                  placeholder="Laudos técnicos, revisões realizadas, problemas identificados, etc."
                  rows="4"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Veículo no Estoque'}
            </button>

            {/* MENSAGEM DE SUCESSO MOVIDA PARA AQUI - ABAIXO DO BOTÃO */}
            {submitSuccess && (
              <div className="form-success-message">
                <CheckCircle2 size={20} />
                <span>Veículo cadastrado com sucesso!</span>
              </div>
            )}

            <div className="form-required-notice">
              <small>* Campos obrigatórios</small>
            </div>
          </form>

        </motion.section>
      </main>

      {/* 6. Footer */}
      <footer className="lp-footer">
        <div className="lp-container">
          <small>© {new Date().getFullYear()} CanutoMotors — Todos os direitos reservados.</small>
        </div>
      </footer>

      {/* Modais */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Modal de Lista de Veículos */}
      <VeiculoListModal
        isOpen={isVeiculoModalOpen}
        onClose={handleCloseVeiculoModal}
        veiculos={veiculos}
        isLoading={isLoading}
        error={error}
        onDeleteVeiculo={handleDeleteVeiculo}
        onEditVeiculo={handleEditVeiculo}
        isEditMode={isEditMode}
        veiculoEditando={veiculoEditando}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        onEditFieldChange={handleEditFieldChange}
        editErrors={editErrors}
      />

    </main>
  );
}

// --- Componente do Card ---
function DashboardCard({ icon: Icon, title, desc, linkText, onClick }) {
  return (
    <motion.div
      className="dash-card"
      variants={fadeUp}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="dash-card-icon">
        <Icon size={24} />
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="dash-card-link">
        {linkText}
        <ArrowRight size={16} />
      </span>
    </motion.div>
  );
}

// --- Componente: Modal da Lista de Veículos ---
function VeiculoListModal({
  isOpen,
  onClose,
  veiculos,
  isLoading,
  error,
  onDeleteVeiculo,
  onEditVeiculo,
  isEditMode,
  veiculoEditando,
  onSaveEdit,
  onCancelEdit,
  onEditFieldChange,
  editErrors
}) {
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
            className="modal-content large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>
                {isEditMode ? 'Editar Veículo' : 'Veículos Disponíveis'}
              </h3>
              <button onClick={onClose} className="modal-close-btn">
                <X width={24} height={24} />
              </button>
            </div>

            <div className="modal-body">
              {isLoading && (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Carregando veículos...</p>
                </div>
              )}

              {error && (
                <div className="error-state">
                  <p>{error}</p>
                </div>
              )}

              {!isLoading && !error && (
                <div className="veiculo-list">
                  {veiculos.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-state-icon">🚗</div>
                      <p>Nenhum veículo cadastrado no momento.</p>
                    </div>
                  ) : (
                    veiculos.map(veiculo => (
                      <VeiculoCard
                        key={veiculo.id}
                        veiculo={veiculo}
                        onDelete={onDeleteVeiculo}
                        onEdit={onEditVeiculo}
                        isEditMode={isEditMode}
                        veiculoEditando={veiculoEditando}
                        onSaveEdit={onSaveEdit}
                        onCancelEdit={onCancelEdit}
                        onEditFieldChange={onEditFieldChange}
                        editErrors={editErrors}
                      />
                    ))
                  )}
                </div>
              )}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ... código anterior mantido ...

// --- Componente: Card do Veículo (MELHORADO COM FORMULÁRIO DE EDIÇÃO REORGANIZADO) ---
function VeiculoCard({
  veiculo,
  onDelete,
  onEdit,
  isEditMode,
  veiculoEditando,
  onSaveEdit,
  onCancelEdit,
  onEditFieldChange,
  editErrors
}) {
  const isEditing = isEditMode && veiculoEditando && veiculoEditando.id === veiculo.id;

  // Função para formatar o preço para BRL (R$)
  const formatPrice = (price) => {
    if (!price) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  // Função para formatar quilometragem
  const formatKm = (km) => {
    if (km === null || km === undefined || km === '') return 'N/A';
    return new Intl.NumberFormat('pt-BR').format(km) + ' km';
  };

  if (isEditing) {
    // Modo de edição - MELHORADO
    return (
      <div className="veiculo-card editing">
        <div className="veiculo-card-img-container">
          <img
            src={veiculoEditando.imagemUrl || 'https://placehold.co/300x200/334155/FFF?text=Sem+Foto'}
            alt={`${veiculoEditando.marca} ${veiculoEditando.modelo}`}
            className="veiculo-card-img"
          />
        </div>
        <div className="veiculo-card-body">
          <div className="edit-form">
            {/* Linha 1: Informações Básicas */}
            <div className="edit-section">
              <h4 className="edit-section-title">Informações Básicas</h4>
              <div className="edit-row">
                <div className="edit-field medium">
                  <label>Marca *</label>
                  <input
                    type="text"
                    value={veiculoEditando.marca}
                    onChange={(e) => onEditFieldChange('marca', e.target.value)}
                    className={editErrors.marca ? 'edit-input error' : 'edit-input'}
                    placeholder="ex: Volkswagen"
                  />
                  {editErrors.marca && (
                    <div className="field-error">
                      <AlertCircle size={12} />
                      {editErrors.marca[0]}
                    </div>
                  )}
                </div>
                <div className="edit-field medium">
                  <label>Modelo *</label>
                  <input
                    type="text"
                    value={veiculoEditando.modelo}
                    onChange={(e) => onEditFieldChange('modelo', e.target.value)}
                    className={editErrors.modelo ? 'edit-input error' : 'edit-input'}
                    placeholder="ex: Golf GTI"
                  />
                  {editErrors.modelo && (
                    <div className="field-error">
                      <AlertCircle size={12} />
                      {editErrors.modelo[0]}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Linha 2: Identificação e Ano */}
            <div className="edit-section">
              <div className="edit-row">
                <div className="edit-field small">
                  <label>Placa *</label>
                  <input
                    type="text"
                    value={veiculoEditando.placa}
                    onChange={(e) => onEditFieldChange('placa', e.target.value)}
                    className={editErrors.placa ? 'edit-input error' : 'edit-input'}
                    placeholder="ABC1D23"
                    style={{ textTransform: 'uppercase' }}
                  />
                  {editErrors.placa && (
                    <div className="field-error">
                      <AlertCircle size={12} />
                      {editErrors.placa[0]}
                    </div>
                  )}
                </div>
                <div className="edit-field small">
                  <label>Ano</label>
                  <input
                    type="number"
                    value={veiculoEditando.ano || ''}
                    onChange={(e) => onEditFieldChange('ano', e.target.value)}
                    className={editErrors.ano ? 'edit-input error' : 'edit-input'}
                    placeholder="2024"
                  />
                  {editErrors.ano && (
                    <div className="field-error">
                      <AlertCircle size={12} />
                      {editErrors.ano[0]}
                    </div>
                  )}
                </div>
                <div className="edit-field small">
                  <label>Cor</label>
                  <input
                    type="text"
                    value={veiculoEditando.cor || ''}
                    onChange={(e) => onEditFieldChange('cor', e.target.value)}
                    className="edit-input"
                    placeholder="Preto"
                  />
                </div>
              </div>
            </div>

            {/* Linha 3: Especificações Técnicas */}
            <div className="edit-section">
              <h4 className="edit-section-title">Especificações Técnicas</h4>
              <div className="edit-row">
                <div className="edit-field small">
                  <label>Combustível</label>
                  <select
                    value={veiculoEditando.combustivel || ''}
                    onChange={(e) => onEditFieldChange('combustivel', e.target.value)}
                    className="edit-input"
                  >
                    <option value="">Selecione</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Álcool">Álcool</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Flex">Flex</option>
                    <option value="Elétrico">Elétrico</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
                <div className="edit-field small">
                  <label>Câmbio</label>
                  <select
                    value={veiculoEditando.cambio || ''}
                    onChange={(e) => onEditFieldChange('cambio', e.target.value)}
                    className="edit-input"
                  >
                    <option value="">Selecione</option>
                    <option value="Manual">Manual</option>
                    <option value="Automático">Automático</option>
                    <option value="Automático Sequencial">Automático Sequencial</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>
                <div className="edit-field small">
                  <label>Status</label>
                  <select
                    value={veiculoEditando.status || 'Disponível'}
                    onChange={(e) => onEditFieldChange('status', e.target.value)}
                    className="edit-input"
                  >
                    <option value="Disponível">Disponível</option>
                    <option value="Vendido" disabled>Vendido</option>
                    <option value="Em Manutenção" disabled>Em Manutenção</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Linha 4: Valores e Quilometragem */}
            <div className="edit-section">
              <h4 className="edit-section-title">Valores</h4>
              <div className="edit-row">
                <div className="edit-field medium">
                  <label>Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={veiculoEditando.preco || ''}
                    onChange={(e) => onEditFieldChange('preco', e.target.value)}
                    className={editErrors.preco ? 'edit-input error' : 'edit-input'}
                    placeholder="75000.00"
                  />
                  {editErrors.preco && (
                    <div className="field-error">
                      <AlertCircle size={12} />
                      {editErrors.preco[0]}
                    </div>
                  )}
                </div>
                <div className="edit-field medium">
                  <label>Quilometragem</label>
                  <input
                    type="number"
                    value={veiculoEditando.quilometragem || ''}
                    onChange={(e) => onEditFieldChange('quilometragem', e.target.value)}
                    className={editErrors.quilometragem ? 'edit-input error' : 'edit-input'}
                    placeholder="50000"
                  />
                  {editErrors.quilometragem && (
                    <div className="field-error">
                      <AlertCircle size={12} />
                      {editErrors.quilometragem[0]}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* URL da Imagem */}
            <div className="edit-section">
              <h4 className="edit-section-title">Imagem</h4>
              <div className="edit-field full-width">
                <label>URL da Imagem</label>
                <input
                  type="text"
                  value={veiculoEditando.imagemUrl || ''}
                  onChange={(e) => onEditFieldChange('imagemUrl', e.target.value)}
                  className={editErrors.imagemUrl ? 'edit-input error' : 'edit-input'}
                  placeholder="https://exemplo.com/foto.jpg"
                />
                {editErrors.imagemUrl && (
                  <div className="field-error">
                    <AlertCircle size={12} />
                    {editErrors.imagemUrl[0]}
                  </div>
                )}
              </div>
            </div>

            {/* NOVOS CAMPOS: Especificações, Histórico, Laudo Técnico */}
            <div className="edit-section">
              <h4 className="edit-section-title">Informações Detalhadas</h4>
              <div className="edit-field full-width">
                <label>Especificações Técnicas</label>
                <textarea
                  value={veiculoEditando.especificacoes || ''}
                  onChange={(e) => onEditFieldChange('especificacoes', e.target.value)}
                  className="edit-input"
                  rows="3"
                  placeholder="Detalhes do motor, potência, consumo, dimensões, etc."
                />
              </div>

              <div className="edit-field full-width">
                <label>Histórico do Veículo</label>
                <textarea
                  value={veiculoEditando.historico || ''}
                  onChange={(e) => onEditFieldChange('historico', e.target.value)}
                  className="edit-input"
                  rows="3"
                  placeholder="Histórico de proprietários e manutenções"
                />
              </div>

              <div className="edit-field full-width">
                <label>Laudo Técnico/Revisões</label>
                <textarea
                  value={veiculoEditando.laudoTecnico || ''}
                  onChange={(e) => onEditFieldChange('laudoTecnico', e.target.value)}
                  className="edit-input"
                  rows="3"
                  placeholder="Laudos e revisões realizadas"
                />
              </div>
            </div>
          </div>

          <div className="veiculo-card-actions">
            <button
              className="btn-save"
              onClick={onSaveEdit}
              disabled={Object.keys(editErrors).length > 0}
            >
              <Save size={16} />
              Salvar Alterações
            </button>
            <button
              className="btn-cancel"
              onClick={onCancelEdit}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ... resto do código do modo de visualização normal mantido igual ...

  // Modo de visualização normal - MELHORADO
  return (
    <div className="veiculo-card">
      <div className="veiculo-card-img-container">
        <img
          src={veiculo.imagemUrl || 'https://placehold.co/300x200/334155/FFF?text=Sem+Foto'}
          alt={`${veiculo.marca} ${veiculo.modelo}`}
          className="veiculo-card-img"
        />
        <div className="veiculo-status-badge" data-status={veiculo.status}>
          {veiculo.status}
        </div>
      </div>
      <div className="veiculo-card-body">
        <div className="veiculo-card-header">
          <h4 className="veiculo-card-title">{veiculo.marca} {veiculo.modelo}</h4>
          <span className="veiculo-card-placa">{veiculo.placa}</span>
        </div>

        {/* MELHORADO: Informações principais em grid */}
        <div className="veiculo-card-grid">
          {veiculo.ano && (
            <div className="veiculo-card-info-item">
              <Calendar size={16} className="info-icon" />
              <span className="info-value">{veiculo.ano}</span>
            </div>
          )}

          {veiculo.quilometragem !== null && veiculo.quilometragem !== undefined && (
            <div className="veiculo-card-info-item">
              <Gauge size={14} className="info-icon" />
              <span className="info-value">{formatKm(veiculo.quilometragem)}</span>
            </div>
          )}

          {veiculo.cor && (
            <div className="veiculo-card-info-item">
              <Palette size={14} className="info-icon" />
              <span className="info-value">{veiculo.cor}</span>
            </div>
          )}

          {veiculo.combustivel && (
            <div className="veiculo-card-info-item">
              <Fuel size={14} className="info-icon" />
              <span className="info-value">{veiculo.combustivel}</span>
            </div>
          )}

          {veiculo.cambio && (
            <div className="veiculo-card-info-item">
              <Settings size={14} className="info-icon" />
              <span className="info-value">{veiculo.cambio}</span>
            </div>
          )}
        </div>

        {/* Preço em destaque */}
        <div className="veiculo-card-price-section">
          <p className="veiculo-card-preco">{formatPrice(veiculo.preco)}</p>
        </div>

        {/* Informações adicionais (se disponíveis) */}
        {(veiculo.especificacoes || veiculo.historico || veiculo.laudoTecnico) && (
          <div className="veiculo-additional-info">
            {veiculo.especificacoes && (
              <div className="info-section">
                <h5 className="info-section-title">Especificações</h5>
                <p className="info-section-content">
                  {veiculo.especificacoes.length > 100
                    ? `${veiculo.especificacoes.substring(0, 100)}...`
                    : veiculo.especificacoes}
                </p>
              </div>
            )}

            {veiculo.historico && (
              <div className="info-section">
                <h5 className="info-section-title">Histórico</h5>
                <p className="info-section-content">
                  {veiculo.historico.length > 80
                    ? `${veiculo.historico.substring(0, 80)}...`
                    : veiculo.historico}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="veiculo-card-actions">
          <button
            className="btn-edit"
            onClick={() => onEdit(veiculo)}
          >
            <Edit size={16} />
            Editar
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(veiculo.id)}
          >
            <Trash2 size={16} />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}