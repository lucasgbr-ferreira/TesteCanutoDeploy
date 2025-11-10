import React, { useState, useEffect } from "react";
import "../styles/perfil.css";
import Header from "../components/HeaderPerfil";

export default function PerfilCliente() {
 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
    cpf: "",
    endereco: "",
    newPassword: ""
  });

  const [backupData, setBackupData] = useState(formData);
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleEdit() {
    setBackupData(formData);
    setIsEditing(true);
  }

  function handleCancel() {
    setFormData(backupData);
    setFotoPreview(null);
    setFotoFile(null);
    setIsEditing(false);
  }

  // erro ao salvar (sem token)
  async function handleSave() {
    try {
      const response = await fetch("http://localhost:3000/api/clients/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
          // sem Authorization
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      alert("Erro ao salvar (normal, falta login)");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar");
    }
  }

  /* ==============
     FOTO DE PERFIL 
  ================== */

  // quando o login existir, isso vira o id real do usuário
  const userId = 1;
  const token = ""; //vazio até login existir

  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoFile, setFotoFile] = useState(null);
  const [fotoUrlServidor, setFotoUrlServidor] = useState(null);

  
  useEffect(() => {
    async function carregarFoto() {
      try {
        const res = await fetch(`http://localhost:3000/api/profile/photo/${userId}`);
        if (res.ok) {
          setFotoUrlServidor(`http://localhost:3000/api/profile/photo/${userId}`);
        }
      } catch {}
    }
    carregarFoto();
  }, []);

  const escolherFoto = () => {
    document.getElementById("inputFoto").click();
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const salvarFoto = async () => {
    if (!fotoFile) return alert("Escolha uma foto primeiro");

    const formData = new FormData();
    formData.append("foto", fotoFile);

    const res = await fetch("http://localhost:3000/api/profile/photo/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}` // vazio!!!
      },
      body: formData
    });

    if (res.ok) {
      alert("Erro proposital: falta login (normal)");
      setFotoFile(null);
      setFotoPreview(null);
      setFotoUrlServidor(
        `http://localhost:3000/api/profile/photo/${userId}?t=${Date.now()}`
      );
    } else {
      alert("Erro ao enviar foto (normal sem login)");
    }
  };

  /* =========
     RETURN 
  ========== */
  return (
    <div className="home-wrapper">
      <Header />

      <main className="perfil-container">
        <section className="perfil-card">
          <h2>Perfil do Cliente</h2>

          <div className="perfil-info">
            {/* FOTO */}
            <div className="foto-area">
              <img
                className="foto-cliente"
                src={
                  fotoPreview ||
                  fotoUrlServidor ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Foto do Cliente"
              />

              <input
                type="file"
                id="inputFoto"
                accept="image/*"
                onChange={handleFoto}
                style={{ display: "none" }}
              />

              <button className="btn-editar" onClick={escolherFoto}>
                Alterar Foto
              </button>

              {fotoFile && (
                <button className="btn-salvar" onClick={salvarFoto}>
                  Salvar Foto
                </button>
              )}
            </div>

            {/* DADOS */}
            <div className="dados-area">
              <label>Nome completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                readOnly={!isEditing}
                onChange={handleChange}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly={!isEditing}
                onChange={handleChange}
              />

              <label>Telefone</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                readOnly={!isEditing}
                onChange={handleChange}
              />

              <label>CPF</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                readOnly={!isEditing}
                onChange={handleChange}
              />

              <label>Endereço</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                readOnly={!isEditing}
                onChange={handleChange}
              />

              <label>Nova Senha</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                readOnly={!isEditing}
                onChange={handleChange}
              />

              <div className="botoes-perfil">
                {!isEditing ? (
                  <button className="btn-salvar" onClick={handleEdit}>
                    Editar Dados
                  </button>
                ) : (
                  <>
                    <button className="btn-salvar" onClick={handleSave}>
                      Salvar
                    </button>
                    <button className="btn-cancelar" onClick={handleCancel}>
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

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
