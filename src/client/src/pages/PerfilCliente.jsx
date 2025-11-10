// src/pages/PerfilCliente.jsx
import React, { useEffect, useState } from "react";
import "../styles/perfil.css";
import Header from "../components/HeaderPerfil";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "http://localhost:3000";

export default function PerfilCliente() {
  const navigate = useNavigate();

  // estado do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
    cpf: "",
    endereco: "",
    newPassword: ""
  });

  const [backupData, setBackupData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // foto
  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoFile, setFotoFile] = useState(null);
  const [fotoUrlServidor, setFotoUrlServidor] = useState(null);

  // UI
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(false);

  // token / user
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const localUserRaw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const localUser = localUserRaw ? JSON.parse(localUserRaw) : null;
  const userId = localUser?.id || null; // usado para buscar foto

  // Carrega dados do usuário ao montar
  useEffect(() => {
    async function carregar() {
      // primeiro tenta popular com localStorage.user (se existir)
      if (localUser) {
        setFormData((prev) => ({
          ...prev,
          name: localUser.name || prev.name,
          email: localUser.email || prev.email
        }));
      }

      // se houver token, pede os dados atualizados ao backend
      if (token) {
        setLoading(true);
        try {
          const res = await fetch(`${API_BASE_URL}/api/clients/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            // o endpoint pode devolver user e client fields; adaptamos
            // exemplo esperado: { user: { name, email }, client: { cpf, telefone, endereco } }
            const out = {
              name: data?.user?.name ?? data?.name ?? formData.name,
              email: data?.user?.email ?? data?.email ?? formData.email,
              telefone: data?.telefone ?? data?.client?.telefone ?? "",
              cpf: data?.cpf ?? data?.client?.cpf ?? "",
              endereco: data?.endereco ?? data?.client?.endereco ?? ""
            };
            setFormData((prev) => ({ ...prev, ...out }));
            setBackupData({ ...prev, ...out });
          } else {
            // não autorizado ou outro problema: mantém localStorage
            // se for 401, podemos forçar logout
            if (res.status === 401) {
              // opcional: redirecionar para login
              // navigate("/login");
            }
          }
        } catch (e) {
          console.error("Erro ao buscar dados:", e);
        } finally {
          setLoading(false);
        }
      }
    }
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // carregar foto do servidor (se existir userId)
  useEffect(() => {
    if (!userId) return;
    // busca a foto pública (rota de get de foto)
    setFotoUrlServidor(`${API_BASE_URL}/api/profile/photo/${userId}`);
  }, [userId]);

  // handlers
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleEdit() {
    setBackupData({ ...formData });
    setIsEditing(true);
    setMsg(null);
    setErr(false);
  }

  function handleCancel() {
    if (backupData) setFormData({ ...backupData });
    setFotoPreview(null);
    setFotoFile(null);
    setIsEditing(false);
    setMsg(null);
    setErr(false);
  }

  async function handleSave() {
    // salva no backend -- precisa de token
    if (!token) {
      setErr(true);
      setMsg("Você precisa estar logado para salvar. Faça login primeiro.");
      return;
    }

    setLoading(true);
    setMsg(null);
    setErr(false);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        telefone: formData.telefone,
        cpf: formData.cpf,
        endereco: formData.endereco
      };
      // se houver nova senha, envie como campo password
      if (formData.newPassword && formData.newPassword.trim() !== "") {
        payload.password = formData.newPassword.trim();
      }

      const res = await fetch(`${API_BASE_URL}/api/clients/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { data = { message: text }; }

      if (!res.ok) {
        setErr(true);
        setMsg(data.message || `Erro (${res.status})`);
      } else {
        // sucesso
        setIsEditing(false);
        setMsg("Dados salvos com sucesso!");
        setErr(false);
        // atualiza localStorage user (se necessário)
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      }
    } catch (e) {
      console.error("Erro ao salvar:", e);
      setErr(true);
      setMsg("Erro ao salvar. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }

  // foto handlers
  const escolherFoto = () => {
    const el = document.getElementById("inputFoto");
    if (el) el.click();
  };

  const handleFoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const salvarFoto = async () => {
    if (!fotoFile) return setMsg("Escolha uma foto antes de enviar.");
    if (!token) {
      setErr(true);
      setMsg("Faça login para enviar foto.");
      return;
    }

    setLoading(true);
    setMsg(null);
    setErr(false);

    try {
      const body = new FormData();
      // seu backend esperava campo "foto" (visto no código anterior)
      body.append("foto", fotoFile);

      const res = await fetch(`${API_BASE_URL}/api/profile/photo/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
          // NÃO colocar Content-Type — browser define para multipart/form-data
        },
        body
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro upload: ${res.status} ${text}`);
      }

      // sucesso: atualizar preview com timestamp para bust cache
      setMsg("Foto enviada com sucesso!");
      setErr(false);
      setFotoFile(null);
      setFotoPreview(null);
      if (userId) {
        setFotoUrlServidor(`${API_BASE_URL}/api/profile/photo/${userId}?t=${Date.now()}`);
      }
    } catch (e) {
      console.error("Erro ao enviar foto:", e);
      setErr(true);
      setMsg("Erro ao enviar foto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-wrapper">
      <Header />

      <main className="perfil-container container" style={{ padding: "36px 0 80px" }}>
        <section className="perfil-card" style={{ background: "var(--surface)", padding: 24, borderRadius: 12 }}>
          <h2 style={{ marginBottom: 8 }}>Perfil do Cliente</h2>
          <p style={{ color: "var(--muted)", marginBottom: 16 }}>Atualize seus dados pessoais e foto de perfil.</p>

          <div className="perfil-info" style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            {/* FOTO */}
            <div className="foto-area" style={{ minWidth: 200, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
              <img
                className="foto-cliente"
                src={
                  fotoPreview ||
                  fotoUrlServidor ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Foto do Cliente"
                style={{ width: 180, height: 180, objectFit: "cover", borderRadius: 100, border: "2px solid rgba(255,255,255,0.06)" }}
              />

              <input
                type="file"
                id="inputFoto"
                accept="image/*"
                onChange={handleFoto}
                style={{ display: "none" }}
              />

              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="btn" onClick={escolherFoto}>Alterar Foto</button>
                {fotoFile && <button type="button" className="btn-outline" onClick={salvarFoto}>Salvar Foto</button>}
              </div>
            </div>

            {/* DADOS */}
            <div className="dados-area" style={{ flex: 1, minWidth: 320 }}>
              <label style={{ color: "var(--muted)", fontSize: 13 }}>Nome completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                readOnly={!isEditing}
                onChange={handleChange}
                style={{ width: "100%", padding: 10, margin: "8px 0 12px", borderRadius: 8, background: "transparent", border: "1px solid var(--border)", color: "var(--text)" }}
              />

              <label style={{ color: "var(--muted)", fontSize: 13 }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly={!isEditing}
                onChange={handleChange}
                style={{ width: "100%", padding: 10, margin: "8px 0 12px", borderRadius: 8, background: "transparent", border: "1px solid var(--border)", color: "var(--text)" }}
              />

              <label style={{ color: "var(--muted)", fontSize: 13 }}>Telefone</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                readOnly={!isEditing}
                onChange={handleChange}
                style={{ width: "100%", padding: 10, margin: "8px 0 12px", borderRadius: 8, background: "transparent", border: "1px solid var(--border)", color: "var(--text)" }}
              />

              <label style={{ color: "var(--muted)", fontSize: 13 }}>CPF</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                readOnly={!isEditing}
                onChange={handleChange}
                style={{ width: "100%", padding: 10, margin: "8px 0 12px", borderRadius: 8, background: "transparent", border: "1px solid var(--border)", color: "var(--text)" }}
              />

              <label style={{ color: "var(--muted)", fontSize: 13 }}>Endereço</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                readOnly={!isEditing}
                onChange={handleChange}
                style={{ width: "100%", padding: 10, margin: "8px 0 12px", borderRadius: 8, background: "transparent", border: "1px solid var(--border)", color: "var(--text)" }}
              />

              <label style={{ color: "var(--muted)", fontSize: 13 }}>Nova Senha</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                readOnly={!isEditing}
                onChange={handleChange}
                style={{ width: "100%", padding: 10, margin: "8px 0 16px", borderRadius: 8, background: "transparent", border: "1px solid var(--border)", color: "var(--text)" }}
              />

              <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 6 }}>
                {!isEditing ? (
                  <button type="button" className="btn" onClick={handleEdit}>Editar Dados</button>
                ) : (
                  <>
                    <button type="button" className="btn" onClick={handleSave} disabled={loading}>{loading ? "Salvando..." : "Salvar"}</button>
                    <button type="button" className="btn-outline" onClick={handleCancel}>Cancelar</button>
                  </>
                )}

                <button type="button" className="btn-outline" onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/login"); }}>
                  Sair
                </button>
              </div>

              {msg && (
                <div style={{ marginTop: 12, color: err ? "#ff6b6b" : "#9be7a5" }}>
                  {msg}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
