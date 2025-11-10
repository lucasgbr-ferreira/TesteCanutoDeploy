import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

console.log("Login loaded");

const API_BASE_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  (typeof window !== "undefined" && window.__API_BASE_URL) ||
  "http://localhost:3000";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!email || !password) {
      setIsError(true);
      setMessage("Preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!res.ok) {
        setIsError(true);
        setMessage(data.message || `Erro (${res.status})`);
        setLoading(false);
        return;
      }

      // ✅ Login bem-sucedido
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || {}));

        const role = data.user?.role;
        setIsError(false);
        setMessage("Login bem-sucedido!");

        // ✅ Redirecionamento conforme role
        setTimeout(() => {
          if (role === "client") {
            navigate("/home_cliente");
          } else if (role === "concessionaria") {
            navigate("/dashboard/estoque");
          } else {
            navigate("/home");
          }
        }, 600);
      } else {
        setIsError(true);
        setMessage("Resposta inválida do servidor.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setIsError(true);
      setMessage("Erro de comunicação com a API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Mantém a imagem e o conteúdo lateral */}
        <div className="auth-visual">
          <h3 style={{ fontSize: 22, margin: 0 }}>Bem-vindo de volta</h3>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Entre com suas credenciais para acessar o painel GesCar.
          </p>
        </div>

        <div className="auth-form">
          <h2 className="auth-title">Entrar</h2>
          <p className="auth-sub">Use seu e-mail e senha cadastrados.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                className="auth-input"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-row">
              <input
                className="auth-input"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </div>

            {message && (
              <div
                className="error"
                style={{ color: isError ? undefined : "lightgreen" }}
              >
                {message}
              </div>
            )}

            <div className="auth-footer" style={{ marginTop: 16 }}>
              Não tem conta?{" "}
              <Link to="/register" style={{ color: "var(--accent)" }}>
                Crie uma conta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



