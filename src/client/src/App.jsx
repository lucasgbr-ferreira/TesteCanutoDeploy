import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CatalogoVeiculos from "./pages/CatalogoVeiculos";
import EstoqueVeiculos from "./pages/EstoqueVeiculos";
import PerfilCliente from "./pages/PerfilCliente";
import HomeCliente from "./pages/HomeCliente";
import SobreConcessionaria from "./pages/SobreConcessionaria";
import DetalhesVeiculo from "./pages/DetalhesVeiculo";
import HomeConcessionaria from "./pages/HomeConcessionaria.jsx"
import HistoricoCliente from "./pages/HistoricoCliente.jsx"
import AgendaCliente from "./pages/AgendamentoCliente.jsx"


const FallbackRegister = () => (
  <div style={{ padding: 40, textAlign: "center" }}>
    <h2>Registrar (indisponível)</h2>
    <p>O componente de registro não pôde ser carregado. Verifique se <code>src/pages/RegisterForm.jsx</code> existe.</p>
  </div>
);
const FallbackLogin = () => (
  <div style={{ padding: 40, textAlign: "center" }}>
    <h2>Login (indisponível)</h2>
    <p>O componente de login não pôde ser carregado. Verifique se <code>src/pages/Login.jsx</code> existe.</p>
  </div>
);

export default function App() {
  const [RegisterComp, setRegisterComp] = useState(null);
  const [LoginComp, setLoginComp] = useState(null);

  useEffect(() => {
    import("./pages/RegisterForm.jsx")
      .then((mod) => setRegisterComp(() => mod.default || mod))
      .catch((err) => {
        console.warn("RegisterForm import failed:", err.message || err);
        setRegisterComp(() => null);
      });
    import("./pages/Login.jsx")
      .then((mod) => setLoginComp(() => mod.default || mod))
      .catch((err) => {
        console.warn("Login import failed:", err.message || err);
        setLoginComp(() => null);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route
        path="/register"
        element={RegisterComp ? <RegisterComp /> : <FallbackRegister />}
      />
      <Route
        path="/login"
        element={LoginComp ? <LoginComp /> : <FallbackLogin />}
      />
      <Route path="/catalog" element={<CatalogoVeiculos />} />
      <Route path="/cliente/catalogo" element={<div style={{ textAlign: 'center', marginTop: 80 }}>Página de Catálogo de Veículos</div>} />
      <Route path="/home_cliente" element={<HomeCliente />} />
      <Route path="/cliente/buscar" element={<div style={{ textAlign: 'center', marginTop: 80 }}>Página de Buscar Veículos</div>} />
      <Route path="/cliente/veiculos" element={<div style={{ textAlign: 'center', marginTop: 80 }}>Página de Veículos</div>} />
      <Route path="/cliente/agenda" element={<div style={{ textAlign: 'center', marginTop: 80 }}>Página de Minha Agenda</div>} />
      <Route path="/cliente/historico" element={<div style={{ textAlign: 'center', marginTop: 80 }}>Página de Histórico</div>} />
      <Route path="/cliente/propostas" element={<div style={{ textAlign: 'center', marginTop: 80 }}>Página de Propostas</div>} />
      <Route path="/cliente/suporte" element={<div style={{ textAlign: 'center', marginTop: 80 }}>Página de Suporte</div>} />
      <Route path="/home_concessionaria" element={<HomeConcessionaria />} />
      <Route path="/dashboard/estoque" element={<EstoqueVeiculos />} />
      <Route path="/perfil" element={<PerfilCliente />} />
      <Route path="/sobre" element={<SobreConcessionaria />} />
      <Route path="/sobre/:id" element={<SobreConcessionaria />} />
      <Route path="/detalhes/:id" element={<DetalhesVeiculo />} />

      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
