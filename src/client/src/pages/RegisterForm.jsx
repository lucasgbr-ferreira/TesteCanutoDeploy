// src/pages/RegisterForm.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import RoleMenu from "../components/RoleMenu";


console.log("RegisterForm loaded");

const API_BASE_URL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE_URL)
  || (typeof window !== "undefined" && window.__API_BASE_URL)
  || "http://localhost:3000";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // client fields
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  // concessionaria fields
  const [nomeComercial, setNomeComercial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefoneCom, setTelefoneCom] = useState("");
  const [emailComercial, setEmailComercial] = useState("");
  const [enderecoCom, setEnderecoCom] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  function show(msg, err = false) {
    setMessage(msg);
    setIsError(err);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    show(null);

    // validações básicas front
    if (!name || !email || !password || !role) {
      show("Preencha nome, e-mail, senha e role.", true);
      return;
    }
    if (!isValidEmail(email)) {
      show("E-mail inválido. Utilize formato usuario@dominio.com", true);
      return;
    }

    const payload = { name: name.trim(), email: email.trim().toLowerCase(), password, role };
    if (role === "client") {
      payload.cpf = cpf || null;
      payload.telefone = telefone || null;
      payload.endereco = endereco || null;
    } else if (role === "concessionaria") {
      payload.nome = nomeComercial || name;
      payload.cnpj = cnpj || null;
      payload.telefone = telefoneCom || null;
      payload.email_comercial = emailComercial || null;
      payload.endereco = enderecoCom || null;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!res.ok) {
        const serverMsg = data.message || `Erro ${res.status}`;
        show(`${serverMsg} (status ${res.status})`, true);
        setLoading(false);
        return;
      }

      show("Registrado com sucesso! Redirecionando para login...", false);
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      console.error("Register error:", err);
      show("Erro de comunicação com a API", true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-visual">
          <h3 style={{ fontSize: 22, margin: 0 }}>Comece agora</h3>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Crie sua conta como cliente ou concessionária e gerencie seus veículos.
          </p>
        </div>

        <div className="auth-form">
          <h2 className="auth-title">Criar conta</h2>
          <p className="auth-sub">Preencha os dados abaixo para criar sua conta.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                className="auth-input"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-row">
              <input
                className="auth-input"
                placeholder="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-row">
              <input
                className="auth-input"
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-row">
            <RoleMenu value={role} onChange={setRole} label="Selecione a função" />
            </div>


            {role === "client" && (
              <>
                <div className="form-row">
                  <input
                    className="auth-input"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="auth-input"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="auth-input"
                    placeholder="Endereço"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                  />
                </div>
              </>
            )}

            {role === "concessionaria" && (
              <>
                <div className="form-row">
                  <input
                    className="auth-input"
                    placeholder="Nome comercial"
                    value={nomeComercial}
                    onChange={(e) => setNomeComercial(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="auth-input"
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="auth-input"
                    placeholder="Telefone comercial"
                    value={telefoneCom}
                    onChange={(e) => setTelefoneCom(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="auth-input"
                    placeholder="E-mail comercial"
                    value={emailComercial}
                    onChange={(e) => setEmailComercial(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="auth-input"
                    placeholder="Endereço da concessionária"
                    value={enderecoCom}
                    onChange={(e) => setEnderecoCom(e.target.value)}
                  />
                </div>
              </>
            )}

            <div style={{ marginTop: 12 }}>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Enviando..." : "Registrar"}
              </button>
            </div>

            {message && <div className="error">{message}</div>}

            <div className="auth-footer">
              Já tem conta? <Link to="/login" style={{ color: "var(--accent)" }}>Entrar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


